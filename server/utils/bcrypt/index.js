let bcrypt = require('bcryptjs');

/**
 * hassing password for securely storing in db;
 * @param {Object}: {password: '*'};
 */
function hash({ password }) {
    return new Promise((resolve, reject)=> {
        bcrypt.genSalt(parseInt(process.env.SALT_LENGTH),(err, salt)=> {
            if (err) {
                reject();
            }
            bcrypt.hash(password, salt,(err, hash)=> {
                if (err) {
                    reject();
                }
                resolve(hash);
            });
        });
    });
};

/**
 * comparing password with hashed password;
 * @param {*}: {password: 'string', hash: 'hashed string'};
 */
function compare({password, hash}) {
    return new Promise((resolve, reject)=> {
        bcrypt.compare(password, hash, (err, bCompare)=> {
            if (err) {
                reject(err);
            }
            resolve(bCompare);
        });
    });
};

module.exports = {
    hash,
    compare
};