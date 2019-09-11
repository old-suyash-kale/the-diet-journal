let { oUser } = require('@modules/User');

module.exports = {
    SignUp: {
        get: {
            connection: true,
            auth: false,
            expect: {
                fname: {
                    label: 'First Name',
                    required: true
                },
                lname: {
                    label: 'Last Name'
                },
                email: {
                    label: 'Email'
                },
                mobile: {
                    label: 'Mobile',
                    required: true
                },
                password: {
                    label: 'Password',
                    required: true
                }
            },
            execute: oUser.rSignUp
        }
    },
    SignIn: {
        get: {
            connection: true,
            auth: false,
            expect: {
                mobile: {
                    label: 'Mobile',
                    required: true
                },
                password: {
                    label: 'Password',
                    required: true
                }
            },
            execute: oUser.rSignIn
        }
    }
};