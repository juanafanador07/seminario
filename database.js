require("dotenv");
const database = require("mysql");

const pool = database.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

pool.on("acquire", function (connection) {
    console.log(`Connection ${connection.threadId} acquired`);
});

pool.on("release", function (connection) {
    console.log(`Connection ${connection.threadId} released`);
});

module.exports = pool;
