const sanitizeHtml = require('sanitize-html');

/*
 * Middleware que sanitiza todas as entradas da requisição:
 * - req.body
 * - req.query
 * - req.params
*/
function sanitizeRequest(req, res, next) {
    if (req.body && typeof req.body === 'object') {
        req.body = sanitizeObject(req.body);
    }

    if (req.query && typeof req.query === 'object') {
        req.query = sanitizeObject(req.query);
    }

    if (req.params && typeof req.params === 'object') {
        req.params = sanitizeObject(req.params);
    }

    next();
}

// Sanitiza recursivamente um objeto (apenas campos string)
function sanitizeObject(obj) {
    const sanitized = {};

    for (const key in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

        const value = obj[key];

        if (typeof value === 'string') {
            sanitized[key] = sanitizeHtml(value, {
                allowedTags: [],
                allowedAttributes: {}
            });
        } else if (typeof value === 'object' && value !== null) {
            sanitized[key] = sanitizeObject(value);
        } else {
            sanitized[key] = value;
        }
    }

    return sanitized;
}

module.exports = sanitizeRequest;