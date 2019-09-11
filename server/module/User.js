let http = require('https');
let SqlString = require('sqlstring');
let nodemailer = require('nodemailer');

let { oMySql } = require('@modules/MySql');
let { sign, verify } = require('@utils/jwt');
let { hash, compare } = require('@utils/bcrypt');
let { dateTimeNow } = require('@utils');

class User {
    constructor({ oMySql }) {
        this.oMySql = oMySql;

        this.oUser = {};

        this.auth_middleware = this.auth_middleware.bind(this);
        this.role_middleware = this.role_middleware.bind(this);

        this.rSignUp = this.rSignUp.bind(this);
        this.rSignIn = this.rSignIn.bind(this);
    };
    
    auth_middleware(req, res, next) {
        const { token } = req.oParams;
        if (token) {
            verify(token) // decoding token;
            .then((decoded)=> {
                const { user_id } = decoded;
                if (user_id) {
                    this.roles({ user_id })
                    .then(()=> { // have access;
                        next();
                    },(err)=> { // dont have access;
                        res.errorToUi({m: [err]});
                    });
                } else {
                    res.errorToUi({m: ['Token is invalid!']});
                }
            });
        } else {
            res.errorToUi({m: ['Token is required!']});
        }
    };

    roles({ user_id }) {
        return new Promise((resolve, reject)=> {
            if (!user_id && this.oUser.user_id) { // setting local user_id is not passed;
                user_id = this.oUser.user_id;
            }
            this.oMySql.query(`
                SELECT GROUP_CONCAT(user_roles.role) AS roles
                FROM user_roles
                WHERE user_id = ${SqlString.escape(user_id)}
            `)
            .then((rows)=> { // getting user roles;
                let roles = rows[0].roles;
                if (roles) { // user role found;
                    roles = roles.split(',');
                    this.oUser.roles = roles;
                    resolve(roles);
                } else { // no user role;
                    reject(`User not assigned to any role!`);
                }
            },(err)=> { // query error;
                reject(err);
            });
        });
    };

    role_middleware(req, res, next, roles) {
        let authorised = false;
        for (let role of roles) {
            if (this.oUser.roles.indexOf(role) >= 0) {
                authorised = true;
                break;
            }
        };
        if (authorised) {
            next();
        } else {
            res.errorToUi({m: ['Access denied!']});
        }
    };

    genJwtToken(type = 0) {
        return new Promise((resolve, reject)=> {
            let { user_id, platform } = this.oUser,
                token = sign({ user_id }), // gen token with salt;
                dt = dateTimeNow();
            this.oMySql
            .insert({ // inserting in tokens table;
                table: 'tokens',
                values: { type, platform, token, user_id, dt }
            })
            .then(()=> {
                if (type == 0) {
                    this.oUser.token = token;
                }
                resolve(token);
            },(err)=> {
                reject(err);
            });
        });
    };

    genToken() {
        let min = 100000,
            max = 999999,
            token = Math.floor(Math.random() * (max - min + 1)) + min,
            { user_id } = this.oUser,
            encoded = sign({ user_id, token });
        return { token, encoded };
    };

    send_email_code() {
        return new Promise((resolve, reject)=> {
            let { user_id, platform, email, fname } = this.oUser,
                { token, encoded } = this.genToken(),
                dt = dateTimeNow();
            this.oMySql
            .insert({ // inserting in tokens table;
                table: 'tokens',
                values: { type: 1, platform, token: encoded, user_id, dt }
            }).then(()=> {
                nodemailer.createTransport({
                    host: 'the-diet-journal.suyashkale.in',
                    port: 587,
                    secure: false,
                    auth: {
                        user: 'no-reply@the-diet-journal.suyashkale.in',
                        pass: 'no-reply1!'
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                }).sendMail({
                    from: `'The Diet Journal' <no-reply@the-diet-journal.suyashkale.in>`,
                    to: `${fname} <${email}>`,
                    subject: 'The Diet Journal - Email Verification',
                    text: `Code: ${token}`,
                    html: `Hello <strong>${fname}</strong>,<br />
                    Hope you are doing well.<br /><br />
                    
                    Welcome to <strong>The Diet Journal</strong>!<br /><br />
                    Please use the bellow code to verify you email:<br />
                    Code: <strong style='font-size: 18px;'>${token}</strong><br /><br />
                    
                    Thank and regards,<br />
                    Team - <a target='_blank' href='https://the-diet-journal.suyashkale.in'>The Diet Journal</a>`
                },(err)=> {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            },(err)=> { // error while inserting;
                reject(err);
            });
        });
    };

    send_mobile_code() {
        return new Promise((resolve, reject)=> {
            let { user_id, platform, mobile } = this.oUser,
                { token, encoded } = this.genToken(),
                dt = dateTimeNow();
            this.oMySql
            .insert({ // inserting in tokens table;
                table: 'tokens',
                values: { type: 2, platform, token: encoded, user_id, dt }
            }).then(()=> {
                http.request({
                    'method': 'POST',
                    'hostname': 'control.msg91.com',
                    'port': null,
                    'path': encodeURI(`/api/sendotp.php?otp=${token}&otp_length=6&sender=SUYASH&message=Your verification code is ${token}. Thanks&mobile=${mobile}&authkey=272551ALSq7H7k5cb4a27c`),
                    'headers': {}
                }, (res)=> {
                    let chunks = [];
                    res.on('data', (chunk)=> {
                        chunks.push(chunk);
                    });
                    res.on('end', function () {
                        try {
                            if (JSON.parse((Buffer.concat(chunks)).toString()).type === 'success') {
                                resolve();
                            } else {
                                reject();
                            }
                        } catch(e) {
                            reject();
                        };
                    });
                }).end();
            });
        });
    };

    signIn(res) {
        this.genJwtToken() // taking case of jwt token;
        .then(()=> {
            let { fname, lname, email, mobile, role, token, email_verified, mobile_verified } = this.oUser,
                d = { fname, lname, email, mobile, role, token, email_verified, mobile_verified };
            res.setHeader('x-the-diet-journal', token) // setting jwt token to header;
            res.set('x-the-diet-journal', token) // setting jwt token to header;
            .header('x-the-diet-journal', token) // setting jwt token to header;
            .successToUi({ d }) // sending data to UI;
        },(err)=> {
            res.errorToUi({ m: [err] });
        });
    };


    rSignUp(req, res) {
        let { fname, lname, email, mobile, password, platform } = req.oParams;
        if (!email) { email = ''; }
        this.oMySql.query(`
            SELECT email, mobile FROM users
            WHERE mobile=${SqlString.escape(mobile)}
        `)
        .then((rows)=> { // checking duplicate for email and mobile;
            if (rows && rows.length) { // email/ mobile is duplicate;
                let dUser = rows[0],
                    m = [];
                if (dUser.mobile == mobile) {
                    m.push('Mobile is already registered!')
                }
                res.errorToUi({ m });
            } else { // no duplicates;
                hash({ password }) // hasing password for security;
                .then((hPassword)=> { // hashed password;
                    this.oMySql.insert({
                        table: 'users',
                        values: { email, mobile, password: hPassword }
                    }).then((user_id)=> {
                        let dt = dateTimeNow(),
                            role = 2;
                        this.oMySql.insert([{
                            table: 'user_details',
                            values: { user_id, fname, lname }
                        }, {
                            table: 'user_roles',
                            values: { user_id, role, dt }
                        }]).then(()=> {
                            this.oUser = { user_id, fname, lname, email, mobile, platform, role: [role], email_verified: 0, mobile_verified: 0};
                            this.send_mobile_code();
                            this.send_email_code();
                            this.signIn(res);
                        },(err)=> { // error in user_details/ user_role query;
                            res.errorToUi({m: [err]});
                        });
                    },(err)=> { // error in inserting in user table;
                        res.errorToUi({m: [err]});
                    });
                },(err)=> {// error in hashing;
                    res.errorToUi({m: [err]});
                });
            }
        },(err)=> { // error in query;
            res.errorToUi({m: [err]});
        });
    };
    
    rSignIn(req, res) {
        let { mobile, password } = req.oParams;
        this.oMySql.query(`
            SELECT
            users.user_id, users.email, users.mobile, users.password,
            user_details.fname, user_details.lname, user_details.email_verified, user_details.mobile_verified,
            (SELECT GROUP_CONCAT(role) FROM user_roles WHERE user_id = users.user_id) AS roles
            FROM users
            INNER JOIN user_details
            ON users.user_id = user_details.user_id
            WHERE users.mobile = ${SqlString.escape(mobile)}
        `).then((rows)=> {
            if (rows && rows.length) {
                let oUser  = rows[0];
                compare({password, hash: oUser.password}) // checking user's password;
                .then((bCompare)=> {
                    if (bCompare) {
                        this.oUser = {
                            user_id: oUser.user_id,
                            fname: oUser.fname,
                            lname: oUser.lname,
                            email: oUser.email,
                            mobile: oUser.mobile,
                            email_verified: oUser.email_verified,
                            mobile_verified: oUser.mobile_verified,
                            roles: oUser.roles
                        };
                        this.signIn(res);
                    } else {
                        res.warningToUi({m: [`Password is incorrect!`]});
                    }
                },(err)=> {
                    res.errorToUi({m: [err]});
                });
            } else { // email/ mobile invalid;
                res.warningToUi({m: [`${username} is not registered!`]});
            }
        },(err)=> {
            res.errorToUi({m: [err]});
        });
    };

};

let oUser = new User({ oMySql });

module.exports = {
    User,
    oUser
};