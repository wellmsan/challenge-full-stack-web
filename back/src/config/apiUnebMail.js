const axios = require("axios");
require('dotenv/config');

const api = axios.create({
    baseURL: process.env.API_UNEB_MAIL_HOST,
});

export default api