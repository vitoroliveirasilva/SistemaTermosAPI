const cors = require('cors');

const corsOptions = {
    origin: ['http://localhost:3000'], // ambiente de teste
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};

module.exports = cors(corsOptions);