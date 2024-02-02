import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com'

export default axios.create({
    baseURL: BASE_URL,
})

