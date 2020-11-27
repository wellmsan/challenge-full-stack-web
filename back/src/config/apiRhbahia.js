const axios = require("axios");
require('dotenv/config');

const api = axios.create({
    baseURL: process.env.API_RHBAHIA_HOST,
    headers: { 'Authorization': process.env.API_RHBAHIA_TOKEN}
});

export default api