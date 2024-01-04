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
  findAndCountAll;
}

/**
 * @swagger
 * components:
 *  CreateArticleRequest:
 *   type: object
 *   properties:
 *    Avatar:
 *     type: string
 *     description: The user's avatar
 *     example: images/avatar.jpg
 *    login:
 *     type: string
 *     description: The user's login
 *     example: pavel
 *    Title:
 *     type: string
 *     description: The article's title
 *     example: Good thing
 *    Text:
 *     type: string
 *     description: The article's text
 *     example: Hello everyone!
 *    userId:
 *     type: number
 *     description: The user's id
 *     example: 1
 *  CreateArticleResponse:
 *   type: object
 *   properties:
 *    id:
 *     type: numbeer
 *     description: The user's id
 *     example: 1
 *    Avatar:
 *     type: string
 *     description: The user's avatar
 *     example: images/avatar.jpg
 *    login:
 *     type: string
 *     description: The user's login
 *     example: pavel
 *    Title:
 *     type: string
 *     description: The article's title
 *     example: Good thing
 *    Text:
 *     type: string
 *     description: The article's text
 *     example: Hello everyone!
 *    createdAt:
 *     type: string
 *     description: The article's creation date
 *     example: 2023-10-25T08:42:03.867Z
 *    updatedAt:
 *     type: string
 *     description: The article's update date
 *     example: 2023-10-25T11:52:36.565Z
 *    userId:
 *     type: number
 *     description: The user's id
 *     example: 1
 *  ListArticlesResponse:
 *   type: object
 *   properties:
 *    id:
 *     type: number
 *     description: The article ID.
 *     example: 1
 *    avatar:
 *     type: string
 *     description: The user's avatar
 *     example: images/avatar.jpg
 *    login:
 *     type: string
 *     description: The user's login
 *     example: pavel
 *    title:
 *     type: string
 *     description: The article's title
 *     example: Hello everyone!
 *    text:
 *     type: string
 *     description: The article's text
 *     example: How are you?
 *    createdAt:
 *     type: string
 *     description: The criation of article
 *     example: 2023-10-25T12:10:31.006Z
 *    updatedAt:
 *     type: string
 *     description: The update of article
 *     example: 2023-10-25T12:19:37.915Z
 *    userId:
 *     type: number
 *     description: The user's id
 *     example: 1
 *  DeleteArticlesRequest:
 *   type: object
 *   properties:
 *    listId:
 *     type: array
 *     example: [1,2,3]
 *  DeleteArticlesResponse:
 *   example: [1,2,3]
 *  UpdateArticleRequest:
 *   type: object
 *   properties:
 *    id:
 *     type: number
 *     description: The article's id
 *     example: 1
 *    title:
 *     type: string
 *     description: The article's title
 *     example: Hello
 *    text:
 *     type: string
 *     description: The article's text
 *     example: How are you doing?
 *  UpdateArticAvatarleRequest:
 *   type: object
 *   properties:
 *    login:
 *     type: string
 *     description: The user's login
 *     example: Pavel
 *    avatar:
 *     type: string
 *     description: The user's path of avatar
 *     example: images/avatar.jpg
 */

const Article: IUserArticle = connection.define('articles', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  avatar: { type: DataTypes.STRING },
  login: { type: DataTypes.STRING },
  title: { type: DataTypes.STRING },
  text: { type: DataTypes.JSON },
});

export default Article;
