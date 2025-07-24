const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to mongodb database")
    })
    .catch((err)=>{
        console.log(err);
        process.exit(1);
    })
}

module.exports = dbConnect;