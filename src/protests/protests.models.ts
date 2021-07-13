import { Document, model, Schema } from 'mongoose';

const schema = new Schema<Protest>({
  _id: Schema.Types.ObjectId,
  name: String,
  description: String,
  startDate: Date,
  endDate: Date,
  associatedUsers: [Object],
  shareToken: Object,
});

interface Protest extends Document {
  _id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  associatedUsers?: [{}];
  shareToken?: {};
}

const protest = model<Protest>('Protest', schema);

export default protest;
