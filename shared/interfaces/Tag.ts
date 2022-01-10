export interface Tag {
  _id?: string;
  text: string;
}

export interface PostTagCreateDto {
  postId: string;
  text: string;
}
export interface PostTagDeleteDto {
  postId: string;
  tagId: string;
}
