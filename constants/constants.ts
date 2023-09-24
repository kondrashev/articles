export interface IUser {
  id?: number;
  login: string;
  role?: string;
  password: string;
  token?: string;
  registration?: boolean;
}

export interface IArticle {
  id: number;
  author: string;
  title: string;
  text: string;
}
