/* eslint-disable prettier/prettier */
import { Document, Schema } from 'mongoose';

const ListSchema = new Schema(
  {
    id: String,
    name: String,
    position: Number,
    status: Boolean,
  },
  {
    timestamps: true,
    // timestamps: {
    //     createdAt: 'created_at',
    //     updatedAt: 'updated_at'
    // }
    collection: 'lists',
  },
);

export { ListSchema };

export interface List extends Document {
  id: string;
  name: string;
  position: number;
  status: boolean;
}
