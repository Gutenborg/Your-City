import { Document, model, Model, Schema } from 'mongoose';

export interface IToken {
  token: string;
  user: string;
}

export interface ITokenDocument extends IToken, Document {}

export type ITokenModel = Model<ITokenDocument>;

const TokenSchema = new Schema<ITokenDocument, ITokenModel>({
  token: {
    required: true,
    type: String,
  },
  user: {
    required: true,
    type: String,
  },
});

export default model<ITokenDocument>('Token', TokenSchema);
