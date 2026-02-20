const { Pool } = require("pg");

// ALTERAR DEPOIS

module.exports = new Pool({
  host: "localhost",
  user: "postgres", 
  database: "shopping_project",
  password: "", 
  port: 5432 
});
