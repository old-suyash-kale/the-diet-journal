import Services from 'services/index.js';

function signIn({ mobile, password }) {
    return Services.toServer({
        url: 'SignIn',
        type: 'POST',
        data: { mobile, password }
    });
};

function signUp({ fname, lname, mobile, email, password }) {
    return Services.toServer({
        url: 'SignUp',
        type: 'POST',
        data: { fname, lname, mobile, email, password }
    });
};

export {
    signUp,
    signIn
};