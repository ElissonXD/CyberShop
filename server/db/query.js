const pool = require("./pool");

async function searchUserbyEmail(email) {
  const {rows} = await pool.query("SELECT * FROM users WHERE email = $1", [email])
  const row = rows[0]
  return rows[0] || null
}

async function createUser(data) {
  await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", [data.username, data.email, data.password]);
}

async function getUserbyId(id) {
  const {rows} = await pool.query("SELECT * FROM users WHERE id = $1", [id])
  return rows[0]
}

async function createHistory(data) {
  const itemsjson = JSON.stringify(data.items)
  await pool.query("INSERT INTO history (user_id, itens, buy_date) VALUES ($1, $2, $3)", [data.id, itemsjson, data.date])  
}

async function getHistory(id) {
  const {rows} = await pool.query("SELECT * FROM history WHERE user_id = $1", [id])
  return rows 
}

async function setPfp(picture, id) {
  await pool.query("UPDATE users SET picture_url = $1 WHERE id = $2", [picture, id])
}

module.exports = {
  createUser,
  searchUserbyEmail,
  getUserbyId,
  createHistory,
  getHistory,
  setPfp
};