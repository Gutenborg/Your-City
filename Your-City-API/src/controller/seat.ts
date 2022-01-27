import { RequestHandler } from 'express';
import { FilterQuery, UpdateQuery } from 'mongoose';
import SeatModel, { IIncumbent, ISeat, ISeatDocument, Level } from '../models/seat';
import { IContactInformation } from '../models/sharedTypes';
import { Empty, ResultOrError } from '../models/sharedTypes';

export interface SeatQuery {
  query?: string;
  level?: Level;
  page?: number;
}

export interface SeatForm
  extends Pick<ISeat, 'name' | 'description' | 'fillMethod' | 'term' | 'level' | 'branch' | 'lastFilled' | 'nextFill'> {
  incumbentName: IIncumbent['name'];
  incumbentServingSince: IIncumbent['servingSince'];
  incumbentAge: IIncumbent['age'];
  incumbentPartyAffiliation: IIncumbent['partyAffiliation'];
  incumbentContactEmail: IContactInformation['email'];
  incumbentContactPhone: IContactInformation['phone'];
  incumbentContactWebsites: string;
}

export const getSeats: RequestHandler<Empty, ISeatDocument[], Empty, SeatQuery> = (request, response) => {
  const { query } = request;
  let pageOffset = 0;
  const pageLimit = 20;
  const filter: FilterQuery<ISeatDocument> = {};

  if (query.query) {
    filter['$text'] = { $search: query.query };
  }

  if (query.level) {
    filter.level = query.level;
  }

  if (query.page) {
    pageOffset = (query.page - 1) * pageLimit;
  }

  SeatModel.find(filter, {}, { limit: pageLimit, skip: pageOffset }, (err, seats) => {
    if (err) response.json(err);

    response.json(seats);
  });
};

export const getSeatById: RequestHandler<Record<'id', string>, ResultOrError<ISeatDocument>, Empty, Empty> = (
  request,
  response
) => {
  SeatModel.findById(request.params.id, {}, {}, (err, seat) => {
    if (err) response.json(err);

    response.json(seat);
  });
};

export const createSeat: RequestHandler<Empty, ResultOrError<ISeatDocument>, SeatForm, Empty> = (request, response) => {
  const { body } = request;

  const newSeatInfo = {
    branch: body.branch,
    description: body.description,
    fillMethod: body.fillMethod,
    'incumbent.name': body.incumbentName,
    'incumbent.age': body.incumbentAge,
    'incumbent.partyAffiliation': body.incumbentPartyAffiliation,
    'incumbent.servingSince': body.incumbentServingSince,
    'incumbent.contact.email': body.incumbentContactEmail,
    'incumbent.contact.phone': body.incumbentContactPhone,
    'incumbent.contact.websites': body.incumbentContactWebsites,
    lastFilled: body.lastFilled,
    level: body.level,
    name: body.name,
    nextFill: body.nextFill,
    term: body.term,
  };

  const newSeat = new SeatModel(newSeatInfo);

  newSeat.save({ validateBeforeSave: true }, (err, seat) => {
    if (err) response.send(err);

    response.json(seat);
  });
};

export const editSeat: RequestHandler<Record<'id', string>, ResultOrError<ISeatDocument>, SeatForm, Empty> = (
  request,
  response
) => {
  const { body } = request;
  const seatId = request.params.id;

  const updatedSeat: UpdateQuery<ISeat> = {
    branch: body.branch,
    description: body.description || undefined,
    fillMethod: body.fillMethod,
    'incumbent.name': body.incumbentName || undefined,
    'incumbent.age': body.incumbentAge || undefined,
    'incumbent.partyAffiliation': body.incumbentPartyAffiliation || undefined,
    'incumbent.servingSince': body.incumbentServingSince || undefined,
    'incumbent.contact.email': body.incumbentContactEmail || undefined,
    'incumbent.contact.phone': body.incumbentContactPhone || undefined,
    'incumbent.contact.websites': body.incumbentContactWebsites || undefined,
    lastFilled: body.lastFilled || undefined,
    level: body.level,
    name: body.name,
    nextFill: body.nextFill,
    term: body.term || undefined,
  };

  SeatModel.findByIdAndUpdate(
    seatId,
    updatedSeat,
    { omitUndefined: true, runValidators: true },
    (err, originalSeat) => {
      if (err) response.send(err);

      response.json(originalSeat);
    }
  );
};

export const deleteSeat: RequestHandler<Record<'id', string>, ResultOrError<ISeatDocument>, Empty, Empty> = (
  request,
  response
) => {
  const seatId = request.params.id;

  SeatModel.findByIdAndRemove(seatId, {}, (err, deletedSeat) => {
    if (err) response.send(err);

    response.json(deletedSeat);
  });
};
