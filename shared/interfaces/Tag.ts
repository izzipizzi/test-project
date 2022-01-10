export interface ITag {
  _id?: string;
  text: string;
}

export interface PostTagCreateData {
  postId: string;
  text: string;
}
export interface PostTagDeleteData {
  postId: string;
  tagId: string;
}
