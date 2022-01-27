import { Document, model, Model, Schema, ValidatorProps } from 'mongoose';
import { validateEmail, validatePhone } from '../helpers/validation';
import { IContactInformation } from './sharedTypes';

export interface ISeat {
  branch: Branch;
  description: string;
  fillMethod: FillMethod;
  incumbent: IIncumbent;
  lastFilled: string;
  level: Level;
  name: string;
  nextFill: string;
  term: string;
}

export interface IIncumbent {
  age: number;
  contact: IContactInformation;
  name: string;
  partyAffiliation: string;
  servingSince: string;
}

export enum Level {
  county = 'county',
  federal = 'federal',
  local = 'local',
  state = 'state',
}

export enum Branch {
  executive = 'executive',
  legislative = 'legislative',
  judicial = 'judicial',
}

export enum FillMethod {
  appointed = 'appointed',
  elected = 'elected',
}

// Create types to be assigned to Mongoose
export interface ISeatDocument extends ISeat, Document {}

export type ISeatModel = Model<ISeatDocument>;

export const seatSchema = new Schema<ISeatDocument, ISeatModel>({
  branch: {
    required: true,
    enum: Object.values(Branch),
    type: String,
  },
  description: {
    required: false,
    type: String,
  },
  fillMethod: {
    required: true,
    enum: Object.values(FillMethod),
    type: String,
  },
  incumbent: {
    age: {
      required: false,
      type: String,
    },
    contact: {
      default: {},
      email: {
        required: false,
        type: String,
        validate: {
          message: (props: ValidatorProps) => `${props.value} is not a valid email address`,
          validator: validateEmail,
        },
      },
      phone: {
        required: false,
        type: String,
        validate: {
          message: (props: ValidatorProps) => `${props.value} is not a valid phone number`,
          validator: validatePhone,
        },
      },
      websites: {
        default: [],
        required: false,
        type: [String],
      },
      required: false,
    },
    default: {},
    servingSince: {
      required: false,
      type: String,
    },
    name: {
      required: false,
      type: String,
    },
    partyAffiliation: {
      required: false,
      type: String,
    },
    required: false,
  },
  lastFilled: {
    required: false,
    type: String,
  },
  level: {
    required: true,
    enum: Object.values(Level),
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  nextFill: {
    required: false,
    type: String,
  },
  term: {
    required: false,
    type: String,
  },
});

export default model<ISeatDocument>('Seat', seatSchema);
