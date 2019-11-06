import $ from 'jquery';

/**
 * Setting default values in Object;
 * @param {Object} p: Original Object;
 * @param {Object} d: values will be dafaulted in the original object;
 */
export default (p, d)=> {
    p = $.extend(true, {}, p);
    for (let k in d) {
        if (k && !p.hasOwnProperty(k)) { // updating only if value is available;
            p[k] = d[k];
        }
    };
    return p;
};