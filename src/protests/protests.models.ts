import { Document, model, Schema } from 'mongoose';

// New schemas are required for sub-documents only when an `id` is needed for the object.
// Otherwise, just link the new structure on the interface and use the generic `object` for the schema.
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

interface Location extends Document {
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

interface Protest extends Document {
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
