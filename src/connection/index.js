const {Pool} = require("pg");

const dbPool = new Pool({
    user: "postgres",
    database: "personal-web",
    password: "masukin password kamu sendiri",
    port: 5432,
})

module.exports = dbPool