import { model, Schema } from 'mongoose';

export interface ITag {
  _id: string;
  text: string;
}

export const TagSchema = new Schema<ITag>({
  text: {
    type: String,
    maxlength: 40,
    minlength: 1,
    required: true,
  },
});

export const TagModel = model<ITag>('Tag', TagSchema);
