import { Document, model, Model, Schema, ValidatorProps } from 'mongoose';
import { validateEmail, validatePhone } from '../helpers/validation';
import { IContactInformation, DaysOfTheWeek, HoursRange } from './sharedTypes';

export interface IBusiness {
  category: Category;
  contact?: IContactInformation;
  description?: string;
  features?: string[];
  hours?: Record<keyof typeof DaysOfTheWeek, HoursRange>;
  images?: string[];
  logo?: string;
  manager?: IManager;
  name: string;
  openedDate?: string;
  products?: IProduct[];
  street?: string;
  tags?: string[];
}

export interface IManager {
  name?: string;
  managementType?: ManagementType;
}

export enum ManagementType {
  franchise = 'franchise',
  corporation = 'corporation',
  owner = 'owner',
}

export interface IProduct {
  name: string;
}

// Create types to be assigned to Mongoose
export interface IBusinessDocument extends IBusiness, Document {}

export type IBusinessModel = Model<IBusinessDocument>;

/**
 * retail = Sells goods directly to the public
 * restaurant = Sells prepared meals
 * distribution = Sells finished goods to retailers
 * supply = Sells raw ingredients to manufacturers
 * manufacturing = Creates and sells finished goods
 * service = Sells services
 * finacial = Sells finacial services
 * legal = Sells legal services
 * health = Sells health-related goods or services
 */
export enum Category {
  retail = 'retail',
  restaurant = 'restaurant',
  distribution = 'distribution',
  supply = 'supply',
  manufacturing = 'manufacturing',
  service = 'service',
  financial = 'financial',
  legal = 'legal',
  health = 'health',
}

export const businessSchema = new Schema<IBusinessDocument, IBusinessModel>({
  category: {
    required: true,
    enum: Object.values(Category),
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
  street: {
    required: false,
    type: String,
  },
  description: {
    required: false,
    type: String,
  },
  features: {
    required: false,
    type: [String],
  },
  hours: {
    default: {
      monday: null,
      tuesday: null,
      wednesday: null,
      thursday: null,
      friday: null,
      saturday: null,
      sunday: null,
    },
    enum: Object.values(DaysOfTheWeek),
    of: String,
    required: false,
    type: Map,
  },
  images: {
    required: false,
    type: [String],
  },
  logo: {
    required: false,
    type: String,
  },
  manager: {
    default: {},
    name: { required: false, type: String },
    managementType: { required: false, enum: Object.values(ManagementType), type: String },
  },
  name: {
    required: true,
    type: String,
  },
  openedDate: {
    required: false,
    type: Date,
  },
  products: {
    default: [],
    required: false,
    type: [String],
  },
  tags: {
    default: [],
    required: false,
    type: [String],
  },
});

// Create a search index
businessSchema.index({ name: 'text', category: 'text', tags: 'text' }, { partial: true });

export default model<IBusinessDocument>('Business', businessSchema);
