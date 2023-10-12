import { DataTypes } from 'sequelize';

import { IArticle } from '../../../constants/constants';
import connection from '../connection';

interface IUserArticle extends IArticle {
  hasMany;
  belongsTo;
  findOne;
  findAll;
  create;
  destroy;
  update;
}

const Article: IUserArticle = connection.define('articles', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  avatar: { type: DataTypes.STRING },
  author: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING },
  text: { type: DataTypes.STRING },
});

export default Article;
