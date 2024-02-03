const mongoose = require('mongoose');

const connectToMongo = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        const con = await mongoose.connect(mongoURI);
        console.log("Mongo connected");
    }
    catch (error) {
        console.log(error);
        process.exit();
    }
}

module.exports = connectToMongo;