import { client } from "../client";

const RoomsApi = {
  get: (id) => client.get(`/rooms/${id}`).then(response => {
    return response.data;
  }).catch(err => err),

  getConsumption: (id) =>
    client.get(`/rooms/${id}/consumption`).then(response => {
      return response.data;
    }).catch(err => err)

};

export default RoomsApi;
