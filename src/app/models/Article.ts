import {User} from './User';

export class Article {
  id: number;
  title: string;
  content: string;
  description: string;
  author: User;
}
