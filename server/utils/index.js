let moment = require('moment');

function defaultProps(p, d) {
    for (let k in d) {
        if (k && !p.hasOwnProperty(k)) {
            p[k] = d[k];
        }
    };
    return p;
};

function dateTimeNow() {
    return moment().utc().format('YYYY-MM-DD HH:mm:ss');
};


module.exports = {
    defaultProps,
    dateTimeNow
};