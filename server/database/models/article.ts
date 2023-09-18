import { DataTypes } from 'sequelize';

import connection from '../connection';

const Article = connection.define('article', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  author: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING },
  text: { type: DataTypes.TEXT },
});

export default Article;
