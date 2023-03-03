const mongoose = require('mongoose')

const connectToMongo = ()=>{
    mongoose.connect(process.env.MONGO_URI,(err)=>{
        if(err) return console.log('Some error occured');
        return console.log("Connected Successfully");
    })
}

module.exports = connectToMongo;