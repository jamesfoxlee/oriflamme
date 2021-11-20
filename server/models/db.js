const mongoose = require('mongoose');
require('dotenv').config();

console.log('init MongoDB');
const { DB_URL, DB_NAME } = process.env;
// console.log('env:', process.env);
console.log(`DB_URL:${DB_URL}, DB_NAME: ${DB_NAME}`);

mongoose.connect(DB_URL, { dbName: DB_NAME })
  .then(() => {
    console.log(`Connected to MongoDB (database: ${DB_NAME})`)
  })
  .catch(err => {
    console.log(err);
  })

mongoose.connection.on('error', (err) => {
  console.log(err);
})

module.exports = mongoose;