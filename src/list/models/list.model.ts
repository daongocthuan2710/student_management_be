/* eslint-disable prettier/prettier */
import { Document, Schema } from 'mongoose';

const ListSchema = new Schema(
  {
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
  name: string;
  position: number;
  status: boolean;
}
