let { defaultProps } = require('@utils');
let { oMySql } = require('@modules/MySql');
let log_api = require('@utils/registerRoutes/middlewares/log_api');

module.exports = function(req, res, next) {

    res.toUi = (o)=> { // default output handlers;
        log_api(req, res, ()=> {
            oMySql.release();
        }, o);
        res.send(o);
    };

    res.successToUi = (o)=> { // output handler for success;
        o = defaultProps(o, {s: 's', m: [], d: {}});
        res.toUi(o);
    };

    res.warningToUi = (o)=> { // output handler for warning;
        o = defaultProps(o, {s: 'w', m: ['Oopsy.. Something went wrong, Please try again!'], d: {}});
        res.toUi(o);
    };

    res.errorToUi = (o)=> { // output handler for error;
        o = defaultProps(o, {s: 'e', m: ['Seems like there is some problem, Please try again later!'], d: {}});
        res.toUi(o);
    };

    next();
};
