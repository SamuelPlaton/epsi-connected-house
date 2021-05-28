import express from 'express';
import {sqlInstance} from "../../index.js";
import {DetectorType, getDetectorPostQuery, getDetectorPutQuery, getDetectorTableQuery} from "../helpers/helpers.js";

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
 *            handler:
 *              type: string
 *            example:
 *              id: 1
 *              type attribute: thermo
 *              state: off or on
 *              handler: manual or auto
 *     responses:
 *      '201':
 *        description: Updated
 *      '400':
 *        description: Bad parameters
 */
routes.put('/detectors', async (request, response) => {
    const data = request.body.data;
    // Parameters check
    if( !data || !data.id || !data.type || !data.state || !data.handler){
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
    } else if (!['auto', 'manual'].includes(data.handler)) {
        response.status(400);
        response.send('Wrong handler').end();
        return;
    }
    // update state
    sqlInstance.request(getDetectorPutQuery(data.type),
        [data.state, data.handler, data.id]).then(async () => {
            // then post historic
            await sqlInstance.request(getDetectorPostQuery(data.type), [data.id, null, data.state]);
            response.status(201);
            response.send([data.state, data.handler]).end();
    });
});
