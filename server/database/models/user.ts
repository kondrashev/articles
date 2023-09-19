import { DataTypes } from 'sequelize';

import connection from '../connection';
import Article from './article';

interface IUserModel {
  id: number;
  login: string;
  role: string;
  password: string;
  hasMany;
  findOne;
  findAll;
  create;
  destroy;
}

const User: IUserModel = connection.define('users', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  login: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'AUTHOR' },
});

User.hasMany(Article, { onDelete: 'cascade' });
Article.belongsTo(User);

export default User;
