
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
            return 'UPDATE LUMINOSITY_DETECTOR SET STATE = ? WHERE ID = ?';
            break;
        case DetectorType.MOVEMENT :
            return 'UPDATE MOVEMENT_DETECTOR SET STATE = ? WHERE ID = ?';
            break;
        case DetectorType.SOUND :
            return 'UPDATE SOUND_DETECTOR SET STATE = ? WHERE ID = ?';
            break;
        case DetectorType.THERMO :
            return 'UPDATE THERMO_DETECTOR SET STATE = ? WHERE ID = ?';
            break;
    }
}

export function getDetectorHistoricQuery (type) {
    switch (type) {
        case DetectorType.LUMINOSITY :
            return 'SELECT * FROM LUMINOSITY_HISTORIC WHERE ID = ?';
            break;
        case DetectorType.MOVEMENT :
            return 'SELECT * FROM MOVEMENT_HISTORIC WHERE ID = ?';
            break;
        case DetectorType.SOUND :
            return 'SELECT * FROM SOUND_HISTORIC WHERE ID = ?';
            break;
        case DetectorType.THERMO :
            return 'SELECT * FROM THERMO_HISTORIC WHERE ID = ?';
            break;
    }
}