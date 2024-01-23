const {Pool} = require("pg");

const dbPool = new Pool({
    user: "postgres",
    database: "personal-web",
    password: "password postgres kamu sendiri",
    port: 5432,
})

module.exports = dbPool