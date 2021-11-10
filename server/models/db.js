const mongoose = require('mongoose');

const { DB_URL, DB_NAME } = process.env;

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