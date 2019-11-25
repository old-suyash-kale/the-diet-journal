let { verify } = require('@utils/jwt');
let { oStore } = require('@modules/Store');

/**
 * handling user auth;
 * @param {Object} req: service's request;
 * @param {Object} res: service's request;
 * @param {Function} next: completing middleware;
 */
module.exports = function({ oParams: {token} }, res, next) {
    if (token) {
        verify(token).then(({ user_id })=> { // decoding token;
            if (user_id) {
                oStore.setProperty('user', {user_id});
                next();
            } else {
                res.errorToUi({m: ['Token is invalid!']});
            }
        }, err=> res.errorToUi({m: [err]}));
    } else {
        res.errorToUi({m: ['Token is required!']});
    }
};