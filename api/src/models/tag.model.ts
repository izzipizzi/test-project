import { model, Schema } from 'mongoose';
import { ITag } from 'shared';

export const TagSchema = new Schema<ITag>({
  text: {
    type: String,
    maxlength: 40,
    minlength: 1,
    required: true,
  },
});

export const TagModel = model<ITag>('Tag', TagSchema);
