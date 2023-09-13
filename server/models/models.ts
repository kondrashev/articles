import { DataTypes } from 'sequelize';

import db from '../db';

export const User = db.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  login: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'AUTHOR' },
});

export const Article = db.define('article', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  author: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING },
  text: { type: DataTypes.TEXT },
});

User.hasMany(Article, { onDelete: 'cascade' });
Article.belongsTo(User);
