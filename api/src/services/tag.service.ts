import { TagModel } from '../models/tag.model';
import { Tag } from 'shared';

export const createTag = async (text: string): Promise<Tag> => {
  return await new TagModel({ text: text }).save();
};

export const deleteTag = async (tagId: string): Promise<Tag> => {
  return TagModel.findByIdAndDelete(tagId);
};
