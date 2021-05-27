import { client } from '../client';

const DetectorsApi = {
    get: (id) => client.get(`/detectors/${id}`).then(response => {
        return response.data;
    }).catch(err => err),

    put: (id, type, state) => client.get('/detectors', { data : {
            id,
            type,
            state,
        }}).then(response => {
        return response.data;
    }).catch(err => err),

}

export default DetectorsApi;
