import { client } from '../client';

const HousesApi = {
    get: (id) => client.get(`/houses/${id}`).then(response => {
    return response.data;
}).catch(err => err),

    list: () => client.get('/houses').then(response => {
    return response.data;
}).catch(err => err),
    
}

export default HousesApi;
