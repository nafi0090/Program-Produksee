// Configuration for database connection
const {
    Pool
} = require('pg');

// Membaca file .env
require('dotenv').config();

// Membuat koneksi ke database
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

module.exports = pool;