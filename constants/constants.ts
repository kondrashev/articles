export interface IUser {
  id?: number;
  login: string;
  role: string;
  password?: string;
  token?: string;
  hasMany: unknown;
}

export interface IArticle {
  id: number;
  author: string;
  title: string;
  text: string;
}
