import { RequestHandler } from 'express';
import { UpdateQuery } from 'mongoose';
import { createImageURL, deleteImages } from '../helpers/images';
import BusinessModel from '../models/business';
import CityModel, { ICity, ICityDocument } from '../models/city';
import { Empty, ResultOrError } from '../models/sharedTypes';

export interface ICityDocumentExtended extends ICityDocument {
  businesses: number;
  mayor: string;
}

export const getCity: RequestHandler<Empty, ResultOrError<ICityDocumentExtended>, Empty, Empty> = (
  request,
  response
) => {
  CityModel.findOne({}, {}, {}, async (err, city) => {
    if (err) response.json(err);

    const extendedCity: any = {};

    if (city) {
      extendedCity.__v = city?.__v;
      extendedCity._id = city?._id;
      extendedCity.area = city?.area;
      extendedCity.businesses = await BusinessModel.estimatedDocumentCount({}).exec();
      extendedCity.foundedOn = city?.foundedOn;
      extendedCity.images = city?.images;
      extendedCity.mayor = 'Placeholder';
      extendedCity.name = city?.name;
      extendedCity.population = city?.population;
    }

    response.json(extendedCity as ICityDocumentExtended);
  });
};

export const editCity: RequestHandler<Empty, ResultOrError<ICityDocument>, ICity, Empty> = (request, response) => {
  const { body } = request;

  const updatedCity: UpdateQuery<ICity> = {
    area: body.area,
    foundedOn: body.foundedOn,
    name: body.name,
    population: body.population,
  };

  CityModel.findOneAndUpdate(
    {},
    updatedCity,
    { omitUndefined: true, runValidators: true, upsert: true },
    (err, originalCity) => {
      if (err) response.send(err);

      response.json(originalCity);
    }
  );
};

export const addCityImages: RequestHandler<Empty, ResultOrError<ICityDocument>, ICity, Empty> = (request, response) => {
  const { files } = request;
  const filesObject: { [fieldname: string]: Express.Multer.File[] } = Object.assign(files);

  if (!filesObject?.images) {
    return response.json({ message: 'There are no images to add.' });
  }

  const imageUrls: string[] = filesObject?.images ? createImageURL(filesObject.images) : [];

  const updatedCity: UpdateQuery<ICity> = {
    $push: {
      images: {
        $each: imageUrls,
      },
    },
  };

  CityModel.findOneAndUpdate({}, updatedCity, { omitUndefined: true, runValidators: true }, (err, originalCity) => {
    if (err) response.send(err);

    response.json(originalCity);
  });
};

export const deleteCityImages: RequestHandler<Empty, ResultOrError<ICityDocument>, { images: string }, Empty> = (
  request,
  response
) => {
  const { body } = request;
  const imageUrls = body?.images.split(',').map((url) => url.trim());

  if (imageUrls && imageUrls.length < 1) {
    return response.json({ message: 'There are no images to delete.' });
  }

  const updatedCity: UpdateQuery<ICity> = {
    $pull: {
      images: {
        $in: imageUrls,
      },
    },
  };

  CityModel.findOneAndUpdate({}, updatedCity, { omitUndefined: true, runValidators: true }, (err, originalCity) => {
    if (err) response.send(err);

    deleteImages(imageUrls);

    response.json(originalCity);
  });
};
