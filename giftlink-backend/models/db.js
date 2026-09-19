require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const url = process.env.MONGO_URL || "mongodb://localhost:27017";
let dbInstance = null;
const dbName = "giftsdb";

async function connectToDatabase() {
    if (dbInstance) {
        return dbInstance;
    }
    const client = new MongoClient(url);
    await client.connect();
    dbInstance = client.db(dbName);
    return dbInstance;
}

module.exports = connectToDatabase;
