import axios from 'axios';

import { Client,Status } from '../interfaces/Client';
export function getClients(): Promise<Client[]>{
  

  return axios.get<Client[]>('http://127.0.0.1:8888/api/clients')
  .then(response => {
      return response.data;
  });
}


export function getStatus(): Promise<Status>{
  return axios.get<Status>('http://127.0.0.1:8888/api/status').then(response => {return response.data; console.log(response.data)})
}