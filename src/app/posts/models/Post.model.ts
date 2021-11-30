import {Author} from "./Author.model";

export class Post {
  constructor(
    public id: string,
    public author: Author,
    public title: string,
    public text: string,
    public likes: number,
    public date: Date) {
  }
}

export class CreatePostPartialData {
  constructor(
    public title: string,
    public text: string,
  ) {
  }
}
