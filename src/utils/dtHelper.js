import moment from 'moment';

/**
 * Current datatime stamp in utc;
 */
export function dateTimeNow() {
    return moment().utc().format('YYYY-MM-DD HH:mm:ss');
};