export interface IUser {
  id?: number;
  login: string;
  role: string;
  password?: string;
}

export interface IGetUser {
  login: string;
  role: string;
  token: string;
}

export interface IArticle {
  id: number;
  author: string;
  title: string;
  text: string;
}
