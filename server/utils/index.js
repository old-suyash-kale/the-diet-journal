let moment = require('moment');

/**
 * Setting default values in Object;
 * @param {Object} p: Original Object;
 * @param {Object} d: values will be dafaulted in the original object;
 */
function defaultProps(p, d) {
    p = Object.assign({}, p);
    for (let k in d) {
        if (k && !p.hasOwnProperty(k)) { // updating only if value is available;
            p[k] = d[k];
        }
    };
    return p;
};

function dateTimeNow() {
    return (new moment()).utc().format('YYYYMMDDHHmmssSSS');
};


module.exports = {
    defaultProps,
    dateTimeNow
};