import Services from 'services/';

function signIn(data) {
    return Services.toServer({
        url: 'SignIn',
        type: 'POST',
        data
    });
};

function signUp(data) {
    return Services.toServer({
        url: 'SignUp',
        type: 'POST',
        data
    });
};

export {
    signUp,
    signIn
};