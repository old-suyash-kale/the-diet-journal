export default (l = 10)=> {
    let t = '',
        p = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    while(l) {
        t += p.charAt(Math.floor(Math.random() * p.length));
        l--;
    };
    return t;
};