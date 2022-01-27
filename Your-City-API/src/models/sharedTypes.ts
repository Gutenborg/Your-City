import { CallbackError, NativeError } from 'mongoose';

export interface IContactInformation {
  websites?: string[];
  phone?: string;
  email?: string;
}

export enum DaysOfTheWeek {
  monday = 'monday',
  tuesday = 'tuesday',
  wednesday = 'wednesday',
  thursday = 'thursday',
  friday = 'friday',
  saturday = 'saturday',
  sunday = 'sunday',
}

export type HoursRange = string;

export type Empty = Record<string, never>;

export type ResultOrError<Result> = Result | NativeError | CallbackError | Record<'message', string>;
