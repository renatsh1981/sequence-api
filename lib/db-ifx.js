import { promisify } from 'util';
import informix from 'informixdb';

const INFORMIXSERVER = process.env.INFORMIXSERVER;

const INFORMIXDB = process.env.INFORMIXDB;

const INFORMIXHOST = process.env.INFORMIXHOST;
const INFORMIXSERVICE = process.env.INFORMIXSERVICE;
const CLIENT_LOCALE = process.env.CLIENT_LOCALE || "ru_RU.utf8";
const DB_LOCALE = process.env.DB_LOCALE || "ru_RU.915";
const DBDSN = "SERVER=" + INFORMIXSERVER
    + ";DATABASE=" + INFORMIXDB
    + ";HOST=" + INFORMIXHOST
    + ";SERVICE=" + INFORMIXSERVICE
    + ";CLIENT_LOCALE=" + CLIENT_LOCALE
    + ";DB_LOCALE=" + DB_LOCALE
    ;

console.log("connecting to informix: ", DBDSN);

const UID = process.env.DBUID;
const PWD = process.env.DBPWD;
const connStr = DBDSN + ";UID=" + UID + ";PWD=" + PWD;

const Pool = informix.Pool;
const pool = new Pool();
const ret = pool.init(5, connStr);
console.log("connected");

const openPool = function (connStr) {

    return new Promise((resolve, reject) => {
        pool.open(connStr, (err, db) => {
            if (err) reject(err)
            else resolve(db);
        })
    })
}

export const queryDB = promisify((conn, ...args) => {
  //  console.log("quering from informix pool");
    return conn.query(...args);
});
export const disconnectDB = promisify((conn, ...args) => conn.close(...args));
export const connectDB = () => {
    return openPool(connStr);
};
