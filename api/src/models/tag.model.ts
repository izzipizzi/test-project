import { model, Schema } from 'mongoose';
import { Tag } from 'shared';

export const TagSchema = new Schema<Tag>({
  text: {
    type: String,
    maxlength: 40,
    minlength: 1,
    required: true,
  },
});

export const TagModel = model<Tag>('Tag', TagSchema);
