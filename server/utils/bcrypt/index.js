let bcrypt = require('bcryptjs');

function hash({password}) {
    return new Promise((resolve, reject)=> {
        bcrypt.genSalt(parseInt(process.env.SALT_LENGTH),(err, salt)=> {
            if (err) {
                reject();
            }
            bcrypt.hash(password, salt, (err, hash)=> {
                if (err) {
                    reject();
                }
                resolve(hash);
            });
        });
    });
};

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