import { Document, model, Model, Schema } from 'mongoose';

export interface ICity {
  area: number;
  foundedOn: Date;
  images?: string[];
  name: string;
  population: number;
}

// Create types to be assigned to Mongoose
export interface ICityDocument extends ICity, Document {}

export type ICityModel = Model<ICityDocument>;

export const citySchema = new Schema<ICityDocument, ICityModel>({
  area: {
    required: false,
    type: Number,
  },
  foundedOn: {
    required: false,
    type: Date,
  },
  images: {
    default: [],
    required: false,
    type: [String],
  },
  name: {
    required: true,
    type: String,
  },
  population: {
    required: false,
    type: Number,
  },
});

export default model<ICityDocument>('City', citySchema);
