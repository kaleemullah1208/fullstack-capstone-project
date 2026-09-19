require('dotenv').config();
const connectToDatabase = require('../../models/db');
const giftsData = require('./gifts.json');

async function loadData() {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        
        const count = await collection.countDocuments();
        if (count === 0) {
            await collection.insertMany(giftsData);
            console.log(`Successfully seeded ${giftsData.length} gifts into giftsdb`);
        } else {
            console.log(`Database already contains ${count} gifts. Skipping seed.`);
        }
    } catch (err) {
        console.error("Error importing gifts data:", err);
    }
}

if (require.main === module) {
    loadData().then(() => process.exit(0));
}

module.exports = { loadData };
