export default (anything)=> {
    if (anything) {
        if (anything instanceof Array) {
            return anything;
        } else if (anything) {
            return [anything];
        }
    }
    return [];
};