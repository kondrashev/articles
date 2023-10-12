export interface IUser {
  id?: number;
  login: string;
  role?: string;
  password: string;
  token?: string;
  registration?: boolean;
  createdAt?: string;
  updatedAt?: string;
  avatar?: string;
}

export interface IArticle {
  id: number;
  avatar: string;
  author: string;
  title: string;
  text: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: number;
}
