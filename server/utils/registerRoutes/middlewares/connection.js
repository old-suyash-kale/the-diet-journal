let { oMySql } = require('@modules/MySql');

/**
 * handling DB connection;
 * @param {Object} req: service's request;
 * @param {Object} res: service's request;
 * @param {Function} next: completing middleware;
 */
module.exports = function({ oParams: {token} }, res, next) {
    return new Promise((resolve, reject)=> {
        if (oMySql.Q) { // connection already established;
            resolve(oMySql.Q);
        }
        oMySql.pool.getConnection((err, Q)=> {
            if (err) {
                reject(err);
            }
            oMySql.Q = Q;
            next();
        }, err=> res.errorToUi({m: [err]}));
    });
};