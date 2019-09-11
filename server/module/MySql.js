let mysql = require('mysql');
let SqlString = require('sqlstring');

class MySql {

    constructor({ HOST, USER, PASSWORD, DATABASE }) {
        this.pool = mysql.createPool({
            host: HOST,
            user: USER,
            password: PASSWORD,
            database: DATABASE
        });
        this.Q = null;
        
        this.connection_middleware = this.connection_middleware.bind(this);
        this.query = this.query.bind(this);
    };

    connect() {
        return new Promise((resolve, reject)=> {
            if (this.Q) {
                resolve(this.Q);
            }
            this.pool
            .getConnection((err, Q)=> {
                if (err) {
                    reject(err);
                }
                this.Q = Q;
                resolve({ Q });
            });
        });
    };

    release() {
        if (!this.Q) {
            return;
        }
        this.Q.release();
        this.Q = null;
        console.log('Connection release with database;');
    };

    connection_middleware(req, res, next) {
        this.connect().then(({ Q })=> {
            req.Q = Q;
            console.log('Connection established with database;');
            next();
        }, (err)=> { // need to handle errors;
            console.log('Connection failed with database;');
        });
    };

    query(q) {
        // return this.Q.query.apply(this.Q, arguments);
        return new Promise((resolve, reject)=> {
            q = q.replace(/\n/gm, ''); // for removing \n
            this.Q.query(q,(err, rows)=> {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    };

    insert(o) {
        if (o.length) { // array; handle for multiple insert;
            let pArr = [];
            for (let param of o) {
                pArr.push(this.insert(param));
            };
            return Promise.all(pArr);
        } else { // single insert;
            return new Promise((resolve, reject)=> {
                let { table, values } = o,
                    cns = [], // column names;
                    cvs = []; // column values;
                for (let cn in values) {
                    cns.push(cn);
                    cvs.push(`'${values[cn]}'`);
                };
                cns = cns.join(', ');
                cvs = cvs.join(', ');
                this.Q.query(`INSERT INTO ${table} (${cns}) VALUES (${cvs})`,(err, o)=> {
                    if (err) {
                        reject(err);
                    } else {
                        let insertId = null;
                        if (o && o.insertId) {
                            insertId = o.insertId;
                        }
                        resolve(insertId);
                    }
                });
            });
        }
    };

};

let oMySql = new MySql({
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DB_DATABASE
});

module.exports = {
    MySql,
    oMySql
};