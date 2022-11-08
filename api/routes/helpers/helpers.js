
export const DetectorType = {
    LUMINOSITY: 'luminosity',
    MOVEMENT: 'movement',
    SOUND: 'sound',
    THERMO: 'thermo',
};

export function getDetectorTableQuery (type) {
    switch (type) {
        case DetectorType.LUMINOSITY :
            return 'SELECT * FROM LUMINOSITY_DETECTOR WHERE ID = ?';
            break;
        case DetectorType.MOVEMENT :
            return 'SELECT * FROM MOVEMENT_DETECTOR WHERE ID = ?';
            break;
        case DetectorType.SOUND :
            return 'SELECT * FROM SOUND_DETECTOR WHERE ID = ?';
            break;
        case DetectorType.THERMO :
            return 'SELECT * FROM THERMO_DETECTOR WHERE ID = ?';
            break;
    }
}

export function getDetectorPutQuery(type) {
    switch (type) {
        case DetectorType.LUMINOSITY :
            return 'UPDATE LUMINOSITY_DETECTOR SET STATE = ?, HANDLER = ? WHERE ID = ?';
            break;
        case DetectorType.MOVEMENT :
            return 'UPDATE MOVEMENT_DETECTOR SET STATE = ?, HANDLER = ? WHERE ID = ?';
            break;
        case DetectorType.SOUND :
            return 'UPDATE SOUND_DETECTOR SET STATE = ?, HANDLER = ? WHERE ID = ?';
            break;
        case DetectorType.THERMO :
            return 'UPDATE THERMO_DETECTOR SET STATE = ?, HANDLER = ? WHERE ID = ?';
            break;
    }
}

export function getDetectorInsertQuery(type) {
    switch (type) {
        case DetectorType.LUMINOSITY :
            return 'INSERT INTO LUMINOSITY_DETECTOR(LABEL, ROOM_ID, STATE) VALUES (?, ?, ?)';
            break;
        case DetectorType.MOVEMENT :
            return 'INSERT INTO MOVEMENT_DETECTOR(LABEL, ROOM_ID, STATE) VALUES (?, ?, ?)';
            break;
        case DetectorType.SOUND :
            return 'INSERT INTO SOUND_DETECTOR(LABEL, ROOM_ID, STATE) VALUES (?, ?, ?)';
            break;
        case DetectorType.THERMO :
            return 'INSERT INTO THERMO_DETECTOR(LABEL, ROOM_ID, STATE) VALUES (?, ?, ?)';
            break;
    }
}

export function getDetectorPostQuery(type) {
    switch (type) {
        case DetectorType.LUMINOSITY :
            return 'INSERT INTO LUMINOSITY_HISTORIC(LUMINOSITY_ID, VALUE, STATE) VALUES (?, ?, ?)';
            break;
        case DetectorType.MOVEMENT :
            return 'INSERT INTO MOVEMENT_HISTORIC(MOVEMENT_ID, VALUE, STATE) VALUES (?, ?, ?)';
            break;
        case DetectorType.SOUND :
            return 'INSERT INTO SOUND_HISTORIC(SOUND_ID, VALUE, STATE) VALUES (?, ?, ?)';
            break;
        case DetectorType.THERMO :
            return 'INSERT INTO THERMO_HISTORIC(THERMO_ID, VALUE, STATE) VALUES (?, ?, ?)';
            break;
    }
}

export function getDetectorHistoricQuery (type) {
    switch (type) {
        case DetectorType.LUMINOSITY :
            return 'SELECT * FROM LUMINOSITY_HISTORIC WHERE LUMINOSITY_ID = ?';
            break;
        case DetectorType.MOVEMENT :
            return 'SELECT * FROM MOVEMENT_HISTORIC WHERE MOVEMENT_ID = ?';
            break;
        case DetectorType.SOUND :
            return 'SELECT * FROM SOUND_HISTORIC WHERE SOUND_ID = ?';
            break;
        case DetectorType.THERMO :
            return 'SELECT * FROM THERMO_HISTORIC WHERE THERMO_ID = ?';
            break;
    }
}