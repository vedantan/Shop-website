const mongoose = require("mongoose")

const dbconnect = async () => {
    try {
        const connection = mongoose.connect(process.env.CONNECTION_STRING)
        console.log("database connected ")
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = dbconnect