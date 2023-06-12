/* eslint-disable prettier/prettier */
import { Document, Schema } from 'mongoose';

const CardSchema = new Schema(
  {
    id: String,
    list_id: String,
    title: String,
    description: String,
    position: Number,
    status: Boolean,
  },
  {
    timestamps: true,
    // timestamps: {
    //     createdAt: 'created_at',
    //     updatedAt: 'updated_at'
    // }
    collection: 'cards',
  },
);

export { CardSchema };

export interface Card extends Document {
  id: string;
  list_id: string;
  title: string;
  description: string;
  position: number;
  status: boolean;
}
