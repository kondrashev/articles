import { Router } from 'express';

import endpoints from '../../constants/endpoints';
import UserValidator from '../validators/index';
// eslint-disable-next-line new-cap
const router = Router();
import AuthorController from '../controllers/authorController';
import checkRole from '../middleware/checkRoleMiddleware';
import errorHandler from '../middleware/ErrorHandlingMiddleware';
/**
 * @swagger
 * /author/add/article:
 *  post:
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - name: auth
 *      in: headers
 *      description: An authorization header
 *      required: true
 *      type: string
 *   tags:
 *   - Article
 *   summary: Create a new article
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/CreateArticleRequest'
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/CreateArticleResponse'
 */
router.post(endpoints.addArticle, checkRole('AUTHOR'), UserValidator.checkAddArticle(), errorHandler, AuthorController.addArticle);
/**
 * @swagger
 * /author/get/articles/?userId={id}:
 *  get:
 *   parameters:
 *    - name: id
 *      in: path
 *      description: Numeric ID of the user to retrieve
 *      required: true
 *      type: number
 *   tags:
 *   - Article
 *   summary: A list of articles with user's id
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/ListArticlesResponse'
 */
router.get(endpoints.getArticles, AuthorController.getArticles);
/**
 * @swagger
 * /author/delete/articles:
 *  post:
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - name: auth
 *      in: header
 *      description: An authorization header
 *      required: true
 *      type: string
 *   tags:
 *   - Article
 *   summary: Delete articles
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/DeleteArticlesRequest'
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/DeleteArticlesResponse'
 */
router.post(endpoints.deleteArticles, checkRole('AUTHOR'), AuthorController.deleteArticles);
/**
 * @swagger
 * /author/update/article:
 *  post:
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - name: auth
 *      in: headers
 *      description: An authorization header
 *      required: true
 *      type: string
 *   tags:
 *   - Article
 *   summary: Update an article
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/UpdateArticleRequest'
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/CreateArticleResponse'
 */
router.post(endpoints.updateArticle, checkRole('AUTHOR'), AuthorController.updateArticle);
export default router;
