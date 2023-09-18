import { DataTypes } from 'sequelize';

import connection from '../connection';

interface IUserArticle {
  id: number;
  author: string;
  title: string;
  text: Text;
  hasMany;
  belongsTo;
  findOne;
  findAll;
  create;
  destroy;
}

const Article: IUserArticle = connection.define('article', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  author: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING },
  text: { type: DataTypes.TEXT },
});

export default Article;
