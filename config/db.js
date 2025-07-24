const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to mongodb database")
    })
    .catch((err)=>{
            console.log(err);
    })
}

module.exports = dbConnect;