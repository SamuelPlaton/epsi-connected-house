import express from 'express';
import { sqlInstance } from '../../index.js';

export const routes = express.Router();
// Method get of data of a house
/**
 * @swagger
 *
 * /houses/{id}:
 *   get:
 *     tags:
 *       - houses
 *     produces:
 *       - application/json
 *     summary:
 *       - Get all data from a house
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *            house:
 *              type: string
 *            rooms:
 *              type: string
 *            example:
 *              house: House Object
 *              rooms: Rooms array
 *     responses:
 *      '200':
 *        description: House data is retrieved
 *
 *
 */
routes.get('/houses/:id', async (request, response) => {
    const house = await sqlInstance.request('SELECT * FROM HOUSE WHERE ID = ? LIMIT 1', [request.params.id]);
    const rooms = await sqlInstance.request('SELECT * FROM ROOM WHERE HOUSE_ID = ?', [request.params.id]);

    response.status(200);
    response.send({
        house: house[0],
        rooms: rooms,
    })
});

// Method get of data of a house
/**
 * @swagger
 *
 * /houses:
 *   get:
 *     tags:
 *       - houses
 *     produces:
 *       - application/json
 *     summary:
 *       - Get all data from all houses
 *     responses:
 *      '200':
 *        description: Houses data is retrieved
 *
 *
 */
routes.get('/houses', async (request, response) => {
    const houses = await sqlInstance.request('SELECT * FROM HOUSE');
    response.status(200);
    response.send(houses)
});


