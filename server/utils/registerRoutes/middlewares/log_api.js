let { oMySql } = require('@modules/MySql');
let { oStore } = require('@modules/Store');
let { dateTimeNow } = require('@utils/index.js');

/**
 * adding api log; capturing start and end time;
 * @param {Object} req: service's request;
 * @param {Object} res: service's request;
 * @param {Function} next: completing middleware;
 */
module.exports = function(req, res, next, o = {}) {
    let table = 'log_api',
        { api_log_id } = req,
        { user_id } = oStore.getProperty('user'),
        { oParams, originalUrl } = req;
    if (api_log_id) { // updating end time for log;
        oMySql.update({
            table,
            values: {
                dt_end: dateTimeNow(),
                res: JSON.stringify(o || {})
            },
            conditions: {
                log_id: api_log_id
            }
        }).then(()=> {
            next();
        }, err=> res.errorToUi({m: [err]}));
    } else { // adding log;
        oMySql.create({
            table,
            values: {
                user_id,
                url: originalUrl,
                req: JSON.stringify(oParams || {}),
                dt_start: dateTimeNow(),
                cdt: null
            }
        }).then(id=> {
            req.api_log_id = id;
            next();
        }, err=> res.errorToUi({m: [err]}));
    }
};