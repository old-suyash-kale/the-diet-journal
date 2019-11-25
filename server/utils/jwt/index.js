let jwt = require('jsonwebtoken');

/**
 * creating jwt token;
 * @param {Object}: any object; will be encoded in jwt;
 */
function sign(o) {
    return jwt.sign(o, process.env.SECRET);
};

/**
 * verifying jwt token with secret;
 * @param {String} token: jwt token;
 */
function verify(token) {
    return new Promise((resolve, reject)=> {
        jwt.verify(token, process.env.SECRET,(err, decoded)=> {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
};

module.exports = {
    sign,
    verify
};
