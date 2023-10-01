import { DataTypes } from 'sequelize';

import { IUser } from '../../../constants/constants';
import connection from '../connection';
import Article from './article';

interface IUserModel extends IUser {
  hasMany;
  findOne;
  findAll;
  create;
  update;
  destroy;
}

const User: IUserModel = connection.define('users', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  login: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'AUTHOR' },
  avatar: { type: DataTypes.STRING, defaultValue: 'P' },
});

User.hasMany(Article, { onDelete: 'cascade' });
Article.belongsTo(User);

export default User;
