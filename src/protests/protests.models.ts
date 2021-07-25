import { Document, model, Schema } from 'mongoose';

const schema = new Schema<Protest>({
  _id: Schema.Types.ObjectId,
  title: String,
  description: String,
  startDate: Date,
  endDate: Date,
  location: Object,
  associatedUsers: [Object],
  shareToken: Object,
  pins: [Object],
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

interface Pin {
  lat: number;
  lng: number;
  label: string;
  imageUrl: string;
  createDate: string;
}

export interface Protest extends Document {
  _id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  location: Location;
  pins: [Pin];
  associatedUsers?: [{}];
  shareToken?: {};
}

const Protest = model<Protest>('Protest', schema);

export default Protest;
