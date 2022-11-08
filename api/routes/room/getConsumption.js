import express from 'express';
import {sqlInstance} from '../../index.js';

export const routes = express.Router();

routes.get('/rooms/:id/consumption', async (request, response) => {
  const room = await sqlInstance.request('SELECT * FROM ROOM WHERE ID = ? LIMIT 1', [request.params.id]);
  const [luminosity_detectors, movement_detectors, sound_detectors, thermo_detectors] = await Promise.all([
    sqlInstance.request(
      `SELECT lh.date, lh.value
       FROM LUMINOSITY_HISTORIC lh
                INNER JOIN LUMINOSITY_DETECTOR ld
                           ON ld.id = lh.luminosity_id
       WHERE ROOM_ID = ?
         AND lh.date BETWEEN DATE_SUB(CURDATE()
           , INTERVAL 15 DAY)
           AND DATE_ADD(CURDATE()
               , INTERVAL 15 DAY)
         AND lh.value IS NOT NULL
       ORDER BY date`, [request.params.id]),
    sqlInstance.request(
      `SELECT mh.date, mh.value
       FROM MOVEMENT_HISTORIC mh
                INNER JOIN MOVEMENT_DETECTOR md
                           ON md.id = mh.movement_id
       WHERE ROOM_ID = ?
         AND mh.date BETWEEN DATE_SUB(CURDATE(), INTERVAL 15 DAY) AND DATE_ADD(CURDATE(), INTERVAL 15 DAY)
         AND mh.value IS NOT NULL
       ORDER BY date`, [request.params.id]),
    sqlInstance.request(
      `SELECT sh.date, sh.value
       FROM SOUND_HISTORIC sh
                INNER JOIN SOUND_DETECTOR sd
                           ON sd.id = sh.sound_id
       WHERE ROOM_ID = ?
         AND sh.date BETWEEN DATE_SUB(CURDATE(), INTERVAL 15 DAY) AND DATE_ADD(CURDATE(), INTERVAL 15 DAY)
         AND sh.value IS NOT NULL
       ORDER BY date`, [request.params.id]),
    sqlInstance.request(
      `SELECT th.date, th.value
       FROM THERMO_HISTORIC th
                INNER JOIN THERMO_DETECTOR td
                           ON td.id = th.thermo_id
       WHERE ROOM_ID = ?
         AND th.date BETWEEN DATE_SUB(CURDATE(), INTERVAL 15 DAY) AND DATE_ADD(CURDATE(), INTERVAL 15 DAY)
         AND th.value IS NOT NULL
       ORDER BY date`, [request.params.id])
  ])

  const detectors = luminosity_detectors
    .concat(movement_detectors)
    .concat(sound_detectors)
    .concat(thermo_detectors);
  response.status(200);
  response.send({
    room: room[0],
    max: Math.max(...detectors.map(el => el.value)),
    min: Math.min(...detectors.map(el => el.value)),
    consumption: sum(detectors.map(el => el.value)),
    detectors: aggByDay(detectors),
  })

  function aggByDay(detectors) {
    const aggDetectors = [];
    detectors = detectors.map((el) => {
      return {
        ...el,
        day: new Date(el.date).toDateString()
      }
    });
    for (const day of new Set(detectors.map(el => el.day))) {
      const daySet = detectors.filter(el => el.day === day);
      aggDetectors.push({date: daySet[0].day, value: sum(daySet.map(el => el.value)) / daySet.length})
    }
    return aggDetectors;
  }

  function sum(numbers) {
    let total = 0;
    for (const value of numbers) {
      total += value;
    }
    return total;
  }
});
