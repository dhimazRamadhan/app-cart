import Axios from 'axios';

export const httpService = Axios.create({
    baseURL: 'https://dummyjson.com'
})