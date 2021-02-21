import axios from 'axios';

import { Client } from '../interfaces/Client';
export function getClients(): Promise<Client[]>{
  

  return axios.get<Client[]>('http://127.0.0.1:8888/api/clients')
  .then(response => {
      return response.data;
  });
}
