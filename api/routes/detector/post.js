import express from 'express';
import {ioServer, sqlInstance} from "../../index.js";
import {
    DetectorType,
    getDetectorHistoricQuery,
    getDetectorInsertQuery,
    getDetectorPostQuery,
    getDetectorPutQuery,
    getDetectorTableQuery
} from "../helpers/helpers.js";

export const routes = express.Router();

/**
 * @swagger
 *
 * /detectors:
 *   post:
 *     tags:
 *       - detectors
 *     produces:
 *       - application/json
 *     summary:
 *       - Post a detector historic
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
 *            value:
 *              type: string
 *            example:
 *              id: 1
 *              type attribute: thermo
 *              state: on (optional)
 *              value: int value
 *     responses:
 *      '200':
 *        description: Posted
 *      '400':
 *        description: Bad parameters
 */
routes.post('/detectors', async (request, response) => {
    const data = request.body.data;
    // Parameters check
    if( !data || !data.id || !data.type || !data.value){
        response.status(400);
        response.send('Missing parameters').end();
        return;
    } else if (!Object.values(DetectorType).includes(data.type)) {
        response.status(400);
        response.send('Detector type incorrect').end();
        return;
    } else if (data.state && !['on', 'off'].includes(data.state)) {
        response.status(400);
        response.send('Wrong state').end();
        return;
    }

    // check for actual detector state
    const detectorRequest = await sqlInstance.request(getDetectorTableQuery(data.type), data.id);
    const detector = detectorRequest[0];
    if (!detector) {
        response.status(400);
        response.send('Detector does not exist').end();
        return;
    }
    const state = data.state ?? detector.state;

    // if detector change state, patch it
    if (data.state && data.state !== detector.state) {
        await sqlInstance.request(getDetectorPutQuery(data.type), [data.state, data.id]);
    }

    // if state is off, don't spread value
    const updatedValue = state === 'off' ? null : data.value;

    sqlInstance.request(getDetectorPostQuery(data.type),
        [data.id, updatedValue, state]).then(async () => {
        const updatedHistorics = await sqlInstance.request(getDetectorHistoricQuery(data.type), [data.id]);
        const createdHistoric = updatedHistorics[updatedHistorics.length-1];
        ioServer.emit('historic', {...createdHistoric, type: data.type});
        response.status(200);
        response.send(createdHistoric).end();
    });
});

routes.post('/detectors/create', async (request, response) => {
    const data = request.body.data;
    // Parameters check
    if( !data || !data.type || !data.room_id || !data.label){
        response.status(400);
        response.send('Missing parameters').end();
        return;
    } else if (!Object.values(DetectorType).includes(data.type)) {
        response.status(400);
        response.send('Detector type incorrect').end();
        return;
    }
    const creationResponse = await sqlInstance.request(getDetectorInsertQuery(data.type),
        [data.label, data.room_id, "on"]);

    const newDetector = await sqlInstance.request(getDetectorTableQuery(data.type), [creationResponse.insertId]);

    response.status(200);
        response.send(newDetector).end();
});
