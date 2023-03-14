const mongoose = require('mongoose')

const connectToMongo = ()=>{
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true},(err)=>{
        if(err) return console.log('Some error occured');
        return console.log("Connected Successfully");
    })
}

module.exports = connectToMongo;