import express from 'express';
import { sqlInstance } from '../../index.js';
import {DetectorType, getDetectorHistoricQuery, getDetectorTableQuery} from "../helpers/helpers.js";

export const routes = express.Router();
// Method get of data of a house
/**
 * @swagger
 *
 * /detectors/{id}:
 *   get:
 *     tags:
 *       - detectors
 *     produces:
 *       - application/json
 *     summary:
 *       - Get all data from a detector
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *            detector:
 *              type: string
 *            historic:
 *              type: string
 *            example:
 *              detector: Detector object
 *              Historic: Historic array
 *     responses:
 *      '200':
 *        description: Detector data is retrieved
 *      '400':
 *        description: Bad detector type
 *
 *
 */
routes.get('/detectors/:id', async (request, response) => {
    // retrieve detector type
    const type = request.query['type'];

    if (!type || !Object.values(DetectorType).includes(type)) {
        response.status(400);
        response.send('Detector type missing or incorrect').end();
        return;
    }

    const detector = await sqlInstance.request(
        getDetectorTableQuery(type), [request.params.id]);
    const historic = await sqlInstance.request(
        getDetectorHistoricQuery(type), [request.params.id]);

    response.status(200);
    response.send({
        detector: detector[0],
        historic
    });
});