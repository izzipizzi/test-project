import { TagModel } from '../models/tag.model';
import { ITag } from 'shared';

export const createTag = async (text: string): Promise<ITag> => {
  return await new TagModel({ text: text }).save();
};

export const deleteTag = async (tagId: string): Promise<ITag> => {
  return TagModel.findByIdAndDelete(tagId);
};
