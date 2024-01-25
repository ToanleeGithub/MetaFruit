require("dotenv").config();

const mongoose = require("mongoose");
const DB_MONGO = process.env.DB_MONGO;

function connectToDb() {
  const uri = DB_MONGO;
  mongoose
    .connect(uri, { dbName: "MetaFruit" })
    .then(() => {
      console.log("Successful connect to DB Mongo");
    })
    .catch((err) => console.log("Fail to Connect to DB", err));
}

module.exports = connectToDb;
