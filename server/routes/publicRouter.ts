import { Router } from 'express';

import endpoints from '../../constants/endpoints';
// eslint-disable-next-line new-cap
const router = Router();
import PublicController from '../controllers/publicController';
/**
 * @swagger
 * /public/list/articles?page={page}:
 *  get:
 *   parameters:
 *    - name: page
 *      in: path
 *      description: Numeric page of the article to retrieve
 *      required: true
 *      type: number
 *   tags:
 *   - List of articles
 *   summary: A list of articles
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         count:
 *          type: number
 *          description: The number of articles
 *          example: 9
 *         rows:
 *          type: array
 *          items:
 *           $ref: '#/components/ListArticlesResponse'
 */
router.get(endpoints.listArticles, PublicController.listArticles);
/**
 * @swagger
 * /public/search/articles?pattern={pattern}:
 *  get:
 *   parameters:
 *    - name: pattern
 *      in: path
 *      description: Word or phrase for searching
 *      required: true
 *      type: string
 *   tags:
 *   - List of articles
 *   summary: A list of articles
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        description: The number of articles
 *        items:
 *         $ref: '#/components/ListArticlesResponse'
 */
router.get(endpoints.searchArticles, PublicController.searchArticles);
export default router;
