import { Document, model, Schema } from 'mongoose';

const schema = new Schema<Protest>({
  _id: Schema.Types.ObjectId,
  name: String,
  description: String,
  startDate: Date,
  endDate: Date,
  location: Object,
  associatedUsers: [Object],
  shareToken: Object,
});

interface Location {
  lat: number;
  lng: number;
  simpleName: string;
  fullName: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
}

export interface Protest extends Document {
  _id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  location: Location;
  associatedUsers?: [{}];
  shareToken?: {};
}

const protest = model<Protest>('Protest', schema);

export default protest;
