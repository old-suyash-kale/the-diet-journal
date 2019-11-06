/**
 * Converting anything to Array;
 * @param {Array, Any} anything: Anything;
 */
export default (anything)=> {
    if (anything) {
        if (anything instanceof Array) {
            return [...anything];
        }
        return [anything];
    }
    return [];
};