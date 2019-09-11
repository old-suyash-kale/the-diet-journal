let { oMySql } = require('@modules/MySql');
let { defaultProps } = require('@utils');

module.exports = {
    register: (req, res)=> {
        res.toUi = (o)=> { // default output handlers;
            o = defaultProps(o, {s: 's', m: [], d: {}});
            if (o.s == 'w' && (!o.m || !o.m.length)) { o.m = ['Oopsy.. Something went wrong, Please try again!']; }
            if (o.s == 'e' && (!o.m || !o.m.length)) { o.m = ['Seems like there is some problem, Please try again later!']; }
            res.send(o);
            console.log(`Route '${req.url}' is executed;`);
            oMySql.release();
        };
        res.successToUi = (o)=> { // output handler for success;
            o = defaultProps(o, {s: 's', m: [], d: {}});
            res.toUi(o);
        };
        res.warningToUi = (o)=> { // output handler for warning;
            o = defaultProps(o, {s: 'w', m: [], d: {}});
            res.toUi(o);
        };
        res.errorToUi = (o)=> { // output handler for error;
            o = defaultProps(o, {s: 'e', m: [], d: {}});
            res.toUi(o);
        };
    }
};