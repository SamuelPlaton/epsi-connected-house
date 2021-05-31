import express from 'express';
import csvWriter from 'csv-writer'
import {sqlInstance} from "../../index.js";
import {
    DetectorType,
    getDetectorHistoricQuery,
    getDetectorPostQuery,
    getDetectorPutQuery,
} from "../helpers/helpers.js";
import { spawn } from 'child_process';
import fs from 'fs';
import csv from 'csv-parser';

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

    // if handler is auto, setup our machine learning AI
    if (data.handler && data.handler === 'auto') {
        // Write Historic
        const historic =  await sqlInstance.request(getDetectorHistoricQuery(data.type), [data.id]);
        const filteredHistoric = historic.filter((h) => h.value !== null);
        const historicWriter = csvWriter.createObjectCsvWriter(({
            path: '../machine-learning/historic.csv',
            header: [
                'Values', 'Hours', 'Months'
            ]
        }));
        const dataToWrite = [{Values: 'Values', Hours: 'Hours', Months: 'Months'}].concat(filteredHistoric.map((el) => ({
            Values: el.value,
            Hours: new Date(el.date).getHours(),
            Months: new Date(el.date).getMonth()
        })));
        await historicWriter.writeRecords(dataToWrite);
        // Write Request
        const requestWriter = csvWriter.createObjectCsvWriter(({
            path: '../machine-learning/request.csv',
            header: [
                'Hours', 'Months'
            ]
        }));
        const today = new Date();
        const requestToWrite = [{Hours: 'Hours', Months: 'Months'}, {Hours: today.getHours(), Months: today.getMonth()}];
        await requestWriter.writeRecords(requestToWrite);
        // Call our Machine Learning Program
        const python = spawn('python', ['../machine-learning/multiple_linear.py']);
        // collect data from script
        await python.stdout.on('data', function (data) {
            console.log(data);
            console.log('Pipe data from python script ...');
        });
        // in close event we are sure that stream from child process is closed
        await python.on('close', (code) => {
            console.log(`child process close all stdio with code ${code}`);
        });
        // Then we read response
        await fs.createReadStream('../machine-learning/response.csv')
            .pipe(csv())
            .on('data', async (row) => {
                if (Object.keys(row).length > 0) {
                    console.log('predicted :',parseInt(Object.keys(row)[0]));
                    await sqlInstance.request(getDetectorPostQuery(data.type), [data.id, parseInt(Object.keys(row)[0]), data.state]);
                }
            })
            .on('end', () => {
                console.log('CSV file successfully processed');
            })
    }

    // update state
    sqlInstance.request(getDetectorPutQuery(data.type),
        [data.state, data.handler, data.id]).then(async () => {
            // then post historic if not already done
            if (data.handler !== 'auto') {
                await sqlInstance.request(getDetectorPostQuery(data.type), [data.id, null, data.state]);
            }
            response.status(201);
            response.send([data.state, data.handler]).end();
    });
});
