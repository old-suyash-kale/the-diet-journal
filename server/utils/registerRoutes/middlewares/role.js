let { oUser } = require('@modules/User');
let { oStore } = require('@modules/Store');

/**
 * handling user auth;
 * @param {Object} req: service's request;
 * @param {Object} res: service's request;
 * @param {Function} next: completing middleware;
 */
module.exports = function(props, req, res, next) {
    let { user_id } = oStore.getProperty('user');
    oUser.getRoles({ user_id }).then(roles=> {
        oStore.setProperty('user', {roles});
        if (roles.filter(r=> props.roles.includes(r)).length) {
            next();
        } else {
            res.errorToUi({m: ['Access denied!']});
        }
    }, err=> res.errorToUi({m: [err]}));
};