import { Document, model, Model, Schema } from 'mongoose';

export interface IUser {
  created_date: Date;
  email: string;
  hashPassword: string;
  role: 'admin' | 'reader' | 'user';
  username: string;
}

export interface IUserDocument extends IUser, Document {}

export type IUserModel = Model<IUserDocument>;

const UserSchema = new Schema<IUserDocument, IUserModel>({
  created_date: {
    default: Date.now,
    type: Date,
  },
  email: {
    required: true,
    set: (email: string) => email.toLowerCase(),
    type: String,
  },
  hashPassword: {
    required: true,
    type: String,
  },
  role: {
    default: 'reader',
    required: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
  },
});

export default model<IUserDocument>('User', UserSchema);
