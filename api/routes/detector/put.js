import express from 'express';
import {sqlInstance} from "../../index.js";
import {DetectorType, getDetectorPutQuery} from "../helpers/helpers.js";

export const routes = express.Router();

/**
 * @swagger
 *
 * /detectors:
 *   put:
 *     tags:
 *       - detectors
 *     produces:
 *       - application/json
 *     summary:
 *       - Update a detector state
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *            id:
 *              type: string
 *            type attribute:
 *              type: string
 *            state:
 *              type: string
 *            example:
 *              id: 1
 *              type attribute: thermo
 *              state: on
 *     responses:
 *      '201':
 *        description: Updated
 *      '400':
 *        description: Bad parameters
 */
routes.put('/detectors', async (request, response) => {
    const data = request.body.data;
    // Parameters check
    if( !data || !data.id || !data.type || !data.state){
        response.status(400);
        response.send('Missing parameters').end();
        return;
    } else if (!Object.values(DetectorType).includes(data.type)) {
        response.status(400);
        response.send('Detector type incorrect').end();
        return;
    } else if (!['on', 'off'].includes(data.state)) {
        response.status(400);
        response.send('Wrong state').end();
        return;
    }

    sqlInstance.request(getDetectorPutQuery(data.type),
        [data.state, data.id]).then(() => {
        response.status(201);
        response.send(data.state).end();
    });
});
