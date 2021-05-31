import { client } from '../client';

const DetectorsApi = {
    get: (id, type) => client.get(`/detectors/${id}?type=${type}`).then(response => {
        return response.data;
    }).catch(err => err),

    post: (id, type, value) => client.post('/detectors', { data : {
            id,
            type,
            value,
        }}).then(response => {
        return response.data;
    }).catch(err => err),

    put: (id, type, state, handler) => client.put('/detectors', { data : {
            id,
            type,
            state,
            handler
        }}).then(response => {
        return response.data;
    }).catch(err => err),

}

export default DetectorsApi;
