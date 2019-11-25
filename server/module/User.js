let http = require('https');
let SqlString = require('sqlstring');
let nodemailer = require('nodemailer');

let { oMySql } = require('@modules/MySql.js');
let { oStore } = require('@modules/Store.js');
let { sign, verify } = require('@utils/jwt/index.js');
let { hash, compare } = require('@utils/bcrypt/index.js');

class User {
    constructor() {
        this.rSignUp = this.rSignUp.bind(this);
        this.rSignIn = this.rSignIn.bind(this);
    };

    /**
     * fetching user role's;
     * @param {Object}: {user_id: Number};
     */
    getRoles({ user_id }) {
        return new Promise((resolve, reject)=> {
            oMySql.query(`
                SELECT GROUP_CONCAT(user_roles.role) AS roles
                FROM user_roles
                WHERE user_id = ${SqlString.escape(user_id)}
            `).then(rows=> { // getting user roles;
                let { roles } = rows[0];
                if (roles) { // user role found;
                    roles = roles.split(',');
                    resolve(roles);
                } else { // no user role;
                    reject(`User not assigned to any role!`);
                }
            },err=> reject(err));
        });
    };

    genToken() {
        let min = 100000,
                max = 999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    saveToken(o, user_id, type, platform) {
        return new Promise((resolve, reject)=> {
            let token = sign(o), cdt;
            oMySql.create({
                table: 'tokens',
                values: { user_id, type, platform, token, cdt }
            }).then(()=> resolve(token), reject);
        });
    };

    send_mobile_code({ user_id, platform }) {
        return new Promise((resolve, reject)=> {
            let token = this.genToken();
            this.saveToken({ user_id, token }, user_id, 2, platform)
            .then(({ token })=> {
                http.request({
                    'method': 'POST',
                    'hostname': 'control.msg91.com',
                    'port': null,
                    'path': encodeURI(`/api/sendotp.php?otp=${token}&otp_length=6&sender=SUYASH&message=Your verification code is ${token}&mobile=${mobile}&authkey=272551ALSq7H7k5cb4a27c`),
                    'headers': {}
                },res=> {
                    let chunks = [];
                    res.on('data',chunk=> chunks.push(chunk));
                    res.on('end',()=> {
                        try {
                            if (JSON.parse((Buffer.concat(chunks)).toString()).type === 'success') {
                                resolve();
                            } else {
                                reject();
                            }
                        } catch(e) {
                            reject(e);
                        };
                    });
                }).end();
            });
        });
    };

    signIn({ user_id, platform }, res) {
        oMySql.query(`
            SELECT
            user.email, user.mobile,
            user_detail.fname, user_detail.lname, user_detail.is_email, user_detail.is_mobile,
            (SELECT GROUP_CONCAT(role) FROM user_roles WHERE user_id = user.user_id) AS roles
            FROM user
            INNER JOIN user_detail
            ON user.user_id = user_detail.user_id
            WHERE user.user_id = ${SqlString.escape(user_id)}
        `).then(rows=> {
            let d = rows[0];
            if (d) {
                this.saveToken({ user_id }, user_id, 1, platform)
                .then(token=> {
                    oStore.setProperty('user', d);
                    res.setHeader('x-the-diet-journal', token) // setting jwt token to header;
                    res.set('x-the-diet-journal', token) // setting jwt token to header;
                    .header('x-the-diet-journal', token) // setting jwt token to header;
                    .successToUi({ d }) // sending data to UI;
                },err=> res.errorToUi({m: [err]}));
            } else {
                res.errorToUi({m: ['unable to find user.']});
            }
        },err=> res.errorToUi({m: [err]}));
    };

    /**
     * handling sign up;
     * @param {Object} req: service's request object;
     * @param {Object} res: service's response object;
     */
    rSignUp({ oParams: {fname, lname, email, mobile, password, platform} }, res) {
        oMySql.query(`
            SELECT mobile FROM user
            WHERE mobile=${SqlString.escape(mobile)}
        `).then(rows=> {
            if (rows && rows.length) { // validating duplicate mobile;
                res.warningToUi({ m: ['Mobile is already registered!'] });
            } else {
                hash({ password }).then(hashed=> { // hasing password;
                    let cdt, udt;
                    oMySql.create({
                        table: 'user',
                        values: { email, mobile, password: hashed, cdt, udt }
                    }).then(user_id=> {
                        oMySql.create([{
                            table: 'user_detail',
                            values: { user_id, fname, lname, cdt, udt }
                        },
                        {
                            table: 'user_roles',
                            values: { user_id, role: 2, cdt, udt }
                        }])
                        .then(()=> {
                            this.signIn({ user_id, platform }, res);
                        }, err=> res.errorToUi({m: [err]}));
                    });
                }, err=> res.errorToUi({m: [err]}));
            }
        }, err=> res.errorToUi({m: [err]}));
    };

    /**
     * handling sign in;
     * @param {Object} req: service's request object;
     * @param {Object} res: service's response object;
     */
    rSignIn({ oParams: {mobile, password, platform} }, res) {
        oMySql.query(`
            SELECT user_id, password FROM user
            WHERE mobile=${SqlString.escape(mobile)}
        `).then(rows=> {
            if (rows && rows.length) {
                let oUser  = rows[0];
                compare({password, hash: oUser.password})
                .then(bCompare=> {
                    if (bCompare) {
                        this.signIn({ user_id: oUser.user_id, platform }, res);
                    } else {
                        res.warningToUi({m: [`Password is incorrect!`]});
                    }
                },err=> res.errorToUi({m: [err]}));
            } else {
                res.warningToUi({m: [`${mobile} is not registered!`]});
            }
        },err=> res.errorToUi({m: [err]}));
    };

};

let oUser = new User();

module.exports = {
    User,
    oUser
};