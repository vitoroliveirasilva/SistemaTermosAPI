const helmet = require('helmet');
const sanitizeRequest = require('../middlewares/sanitizeMiddleware');

function applySecurity(app) {
    app.use(helmet());
    app.use(sanitizeRequest);
}

module.exports = applySecurity;