let jwt = require('jsonwebtoken');

function sign(o) {
    return jwt.sign(o, process.env.SECRET);
};

function verify(token) {
    return new Promise((resolve, reject)=> {
        jwt.verify(token, process.env.SECRET, (err, decoded)=> {
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
