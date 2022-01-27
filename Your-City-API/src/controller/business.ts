import { RequestHandler } from 'express';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { createImageURL, deleteImages } from '../helpers/images';
import BusinessModel, { Category, IBusiness, IBusinessDocument, IManager } from '../models/business';
import { HoursRange, IContactInformation } from '../models/sharedTypes';
import { Empty, ResultOrError } from '../models/sharedTypes';

export interface BusinessQuery {
  category?: Category;
  query?: string;
  tags?: string[];
  page?: number;
}

export interface BusinessForm extends Pick<IBusiness, 'name' | 'category' | 'description' | 'openedDate' | 'street'> {
  contactEmail: IContactInformation['email'];
  contactPhone: IContactInformation['phone'];
  contactWebsites: IContactInformation['websites'];
  hoursMonday: HoursRange;
  hoursTuesday: HoursRange;
  hoursWednesday: HoursRange;
  hoursThursday: HoursRange;
  hoursFriday: HoursRange;
  hoursSaturday: HoursRange;
  hoursSunday: HoursRange;
  managerName: IManager['name'];
  managerManagementType: IManager['managementType'];
  features: string;
  tags: string;
}

export const getBusinesses: RequestHandler<Empty, IBusinessDocument[], Empty, BusinessQuery> = (request, response) => {
  const { query } = request;
  let pageOffset = 0;
  const pageLimit = 20;
  const filter: FilterQuery<IBusinessDocument> = {};

  if (query.query) {
    filter['$text'] = { $search: query.query };
  }

  if (query.category) {
    filter.category = query.category;
  }

  if (query.tags) {
    filter.tags = query.tags;
  }

  if (query.page) {
    pageOffset = (query.page - 1) * pageLimit;
  }

  BusinessModel.find(filter, {}, { limit: pageLimit, skip: pageOffset }, (err, businesses) => {
    if (err) response.json(err);

    response.json(businesses);
  });
};

export const getBusinessById: RequestHandler<Record<'id', string>, ResultOrError<IBusinessDocument>, Empty, Empty> = (
  request,
  response
) => {
  BusinessModel.findById(request.params.id, {}, {}, (err, business) => {
    if (err) response.json(err);

    response.json(business);
  });
};

export const createBusiness: RequestHandler<Empty, ResultOrError<IBusinessDocument>, BusinessForm, Empty> = (
  request,
  response
) => {
  const { body, files } = request;
  const filesObject: { [fieldname: string]: Express.Multer.File[] } = Object.assign(files);

  const logoUrl: string | undefined = filesObject?.logo ? createImageURL(filesObject.logo)[0] : undefined;
  const imageUrls: string[] | undefined = filesObject?.images ? createImageURL(filesObject?.images) : undefined;

  const newBusinessInfo = {
    category: body.category,
    name: body.name,
    'contact.email': body.contactEmail,
    'contact.phone': body.contactPhone,
    'contact.websites': body.contactWebsites,
    description: body.description,
    features: body.features.split(','),
    'hours.monday': body.hoursMonday,
    'hours.tuesday': body.hoursTuesday,
    'hours.wednesday': body.hoursWednesday,
    'hours.thursday': body.hoursThursday,
    'hours.friday': body.hoursFriday,
    'hours.saturday': body.hoursSaturday,
    'hours.sunday': body.hoursSunday,
    'manager.name': body.managerName,
    'manager.managementType': body.managerManagementType,
    openedDate: body.openedDate,
    street: body.street,
    tags: body.tags.split(','),
    logo: logoUrl,
    images: imageUrls,
  };

  const newBusiness = new BusinessModel(newBusinessInfo);

  newBusiness.save((err, business) => {
    if (err) {
      if (logoUrl) deleteImages(logoUrl);
      if (imageUrls) deleteImages(imageUrls);

      response.send(err);
    }

    response.json(business);
  });
};

export const editBusiness: RequestHandler<
  Record<'id', string>,
  ResultOrError<IBusinessDocument>,
  BusinessForm,
  Empty
> = (request, response) => {
  const { body, files } = request;
  const filesObject: { [fieldname: string]: Express.Multer.File[] } = Object.assign(files);
  const logoURL = filesObject?.logo ? createImageURL(filesObject.logo)[0] : undefined;
  const businessId = request.params.id;

  const updatedBusiness: UpdateQuery<IBusiness> = {
    category: body.category,
    name: body.name,
    'contact.email': body.contactEmail,
    'contact.phone': body.contactPhone,
    'contact.websites': body.contactWebsites,
    description: body.description,
    features: body.features.split(','),
    'hours.monday': body.hoursMonday,
    'hours.tuesday': body.hoursTuesday,
    'hours.wednesday': body.hoursWednesday,
    'hours.thursday': body.hoursThursday,
    'hours.friday': body.hoursFriday,
    'hours.saturday': body.hoursSaturday,
    'hours.sunday': body.hoursSunday,
    'manager.managementType': body.managerManagementType,
    'manager.name': body.managerName,
    openedDate: body.openedDate,
    street: body.street,
    tags: body.tags.split(','),
    logo: logoURL,
  };

  BusinessModel.findByIdAndUpdate(
    businessId,
    updatedBusiness,
    { omitUndefined: true, runValidators: true },
    (err, originalBusiness) => {
      if (err) response.send(err);

      if (logoURL && originalBusiness?.logo) {
        deleteImages(originalBusiness.logo);
      }

      response.json(originalBusiness);
    }
  );
};

export const addBusinessImages: RequestHandler<
  Record<'id', string>,
  ResultOrError<IBusinessDocument>,
  IBusiness,
  Empty
> = (request, response) => {
  const { files } = request;
  const filesObject: { [fieldname: string]: Express.Multer.File[] } = Object.assign(files);

  if (!filesObject?.images) {
    return response.json({ message: 'There are no images to add.' });
  }

  const imageUrls: string[] = filesObject?.images ? createImageURL(filesObject.images) : [];
  const businessId = request.params.id;

  const updatedBusiness: UpdateQuery<IBusiness> = {
    $push: {
      images: {
        $each: imageUrls,
      },
    },
  };

  BusinessModel.findByIdAndUpdate(
    businessId,
    updatedBusiness,
    { omitUndefined: true, runValidators: true },
    (err, originalBusiness) => {
      if (err) response.send(err);

      response.json(originalBusiness);
    }
  );
};

export const deleteBusinessImages: RequestHandler<
  Record<'id', string>,
  ResultOrError<IBusinessDocument>,
  { images: string },
  Empty
> = (request, response) => {
  const { body } = request;
  const businessId = request.params.id;
  const imageUrls = body?.images.split(',').map((url) => url.trim());

  if (imageUrls && imageUrls.length < 1) {
    return response.json({ message: 'There are no images to delete.' });
  }

  const updatedBusiness: UpdateQuery<IBusiness> = {
    $pull: {
      images: {
        $in: imageUrls,
      },
    },
  };

  BusinessModel.findByIdAndUpdate(
    businessId,
    updatedBusiness,
    { omitUndefined: true, runValidators: true },
    (err, originalBusiness) => {
      if (err) response.send(err);

      deleteImages(imageUrls);

      response.json(originalBusiness);
    }
  );
};

export const deleteBusiness: RequestHandler<Record<'id', string>, ResultOrError<IBusinessDocument>, Empty, Empty> = (
  request,
  response
) => {
  const businessId = request.params.id;

  BusinessModel.findByIdAndRemove(businessId, {}, (err, deletedBusiness) => {
    if (err) response.send(err);

    if (deletedBusiness?.logo) {
      deleteImages(deletedBusiness.logo);
    }

    if (deletedBusiness?.images) {
      deleteImages(deletedBusiness.images);
    }

    response.json(deletedBusiness);
  });
};
