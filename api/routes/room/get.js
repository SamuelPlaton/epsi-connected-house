import express from 'express';
import { sqlInstance } from '../../index.js';

export const routes = express.Router();
// Method get of data of a house
/**
 * @swagger
 *
 * /rooms/{id}:
 *   get:
 *     tags:
 *       - rooms
 *     produces:
 *       - application/json
 *     summary:
 *       - Get all data from a room
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *            room:
 *              type: string
 *            detectors:
 *              type: string
 *            example:
 *              room: Room object
 *              detectors: Detectors Array
 *     responses:
 *      '200':
 *        description: Room data is retrieved
 *
 *
 */
routes.get('/rooms/:id', async (request, response) => {
    const room = await sqlInstance.request('SELECT * FROM ROOM WHERE ID = ? LIMIT 1', [request.params.id]);
    const luminosity_detectors = await sqlInstance.request(
        'SELECT * FROM LUMINOSITY_DETECTOR WHERE ROOM_ID = ?', [request.params.id]);
    const movement_detectors = await sqlInstance.request(
        'SELECT * FROM MOVEMENT_DETECTOR WHERE ROOM_ID = ?', [request.params.id]);
    const sound_detectors = await sqlInstance.request(
        'SELECT * FROM SOUND_DETECTOR WHERE ROOM_ID = ?', [request.params.id]);
    const thermo_detectors = await sqlInstance.request(
        'SELECT * FROM THERMO_DETECTOR WHERE ROOM_ID = ?', [request.params.id]);

    response.status(200);
    response.send({
        room: room[0],
        detectors: {
            luminosity_detectors,
            movement_detectors,
            sound_detectors,
            thermo_detectors
        },
    })
});