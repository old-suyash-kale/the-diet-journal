let mysql = require('mysql');
let SqlString = require('sqlstring');

let { oStore } = require('@modules/Store.js');
let { dateTimeNow } = require('@utils/index.js');

class MySql {

    constructor({ HOST, USER, PASSWORD, DATABASE }) {
        this.pool = mysql.createPool({
            host: HOST,
            user: USER,
            password: PASSWORD,
            database: DATABASE
        });
        this.Q = null;
        this.query = this.query.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    };


    /**
     * releasing connection;
     */
    release() {
        if (!this.Q) { // connection never established;
            return;
        }
        this.Q.release();
        this.Q = null;
    };

    /**
     * executing query;
     * @param {String} q: query string;
     */
    query(q) {
        return new Promise((resolve, reject)=> {
            q = q.replace(/\n/gm, ''); // for removing \n (line break);
            this.Q.query(q,(err, rows)=> {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    };

    /**
     * handling single and multipe create;
     * @param {Object} o: {table: tableName, values: {columnName: columnvalue}}
     */
    create(o) {
        if (o.length) { // array; handle for multiple create;
            let pArr = [];
            for (let param of o) {
                pArr.push(this.create(param));
            };
            return Promise.all(pArr);
        } else { // single create;
            return new Promise((resolve, reject)=> {
                let { table, values } = o,
                    cns = [], // column names;
                    cvs = []; // column values;
                for (let cn in values) {
                    let cv = values[cn];
                    cns.push(cn);
                    if (['dt', 'cdt', 'udt'].includes(cn) && !cv) { // handling datetime fields;
                        cv = dateTimeNow();
                    }
                    cvs.push(SqlString.escape(cv));
                };
                cns = cns.join(', ');
                cvs = cvs.join(', ');
                this.Q.query(`INSERT INTO ${table} (${cns}) VALUES (${cvs})`,(err, row)=> {
                    if (err) {
                        reject(err);
                    } else {
                        let insertId = null;
                        if (row && row.insertId) {
                            insertId = row.insertId;
                        }
                        this.add_cud_log(o, 'C');
                        resolve(insertId);
                    }
                });
            });
        }
    };

    /**
     * handling single and multipe update;
     * @param {Object} o: {table: tableName, values: {columnName: columnvalue}, conditions: {columnName: columnvalue}}
     */
    update(o) {
        if (o.length) { // array; handle for multiple update;
            let pArr = [];
            for (let param of o) {
                pArr.push(this.update(param));
            };
            return Promise.all(pArr);
        } else { // single update;
            return new Promise((resolve, reject)=> {
                let { table, values, conditions } = o,
                    sets = [],
                    c = []; // conditions;
                for (let cn in values) {
                    if (['dt', 'cdt', 'udt'].includes(cn) && !values[cn]) {
                        values[cn] = dateTimeNow();
                    }
                    sets.push(`${cn}=${SqlString.escape(values[cn])}`);
                };
                for (let cn in conditions) {
                    let cv = conditions[cn];
                    c.push(`${cn}=${cv}`);
                };
                sets = sets.join(', ');
                c = c.join(' AND ');
                this.Q.query(`UPDATE ${table} SET ${sets} WHERE ${c}`,err=> {
                    if (err) {
                        reject(err);
                    } else {
                        this.add_cud_log(o, 'U');
                        resolve();
                    }
                });
            });
        }
    };

    /**
     * handling single and multipe delete;
     * @param {Object} o: {table: tableName, conditions: {columnName: columnvalue}}
     */
    delete(o) {
        if (o.length) { // array; handle for multiple delete;
            let pArr = [];
            for (let param of o) {
                pArr.push(this.delete(param));
            };
            return Promise.all(pArr);
        } else { // single delete;
            let { table, conditions } = o,
                c = []; // conditions;
            for (let cn in conditions) {
                let cv = conditions[column];
                c.push(`${cn} EQ ${cv}`);
            };
            c = c.join(' AND ');
            this.Q.query(`DELETE FROM ${table} WHERE ${c}`,err=> {
                if (err) {
                    reject(err);
                } else {
                    this.add_cud_log(o, 'D');
                    resolve();
                }
            });
        }
    };

    /**
     * adding create, update and delete logs;
     * @param {Object} o: can we any object from create/ update/ delete;
     * @param {*} operation: C: create OR U: update OR D: delete;
     */
    add_cud_log(o, operation = 'I') {
        let { table, conditions, values } = o,
        { user_id } = oStore.getProperty('user');
        if (!['log_cud', 'log_api'].includes(table)) {
            this.create({
                table: 'log_cud',
                values: {
                    user_id,
                    table_name: table,
                    conditions: JSON.stringify(conditions || {}),
                    operation,
                    table_values: JSON.stringify(values || {}),
                    cdt: null
                }
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