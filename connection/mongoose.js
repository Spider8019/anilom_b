const mongoose = require('mongoose')
const dotenv = require("dotenv");
dotenv.config()


mongoose.Promise= global.Promise;
const connect = mongoose.connection;
mongoose.set('strictQuery', true)


const connectDB = async()=>{
    const url = 'mongodb+srv://spider8019official:spider8019official@cluster0.ptqucsb.mongodb.net/anilom'
    connect.on('connected', async()=>{
        console.log('MongoDb Connection Established')
    })
    connect.on('reconnected', async()=>{
        console.log('MongoDB Connection Reestablished')
    })
    connect.on('disconnected',()=>{
        console.log('MongoDB Connection Disconnected')
        console.log('Trying to reconnect to Mongo...')


        setTimeout(()=>{
            mongoose.connect('mongodb+srv://spider8019official:spider8019official@cluster0.ptqucsb.mongodb.net/anilom',{
                keepAlive: true,
                socketTimeourMS: 3000,
                connectTimeoutMS: 3000
            })
        }, 3000)
    })
    connect.on('close',() =>{
        console.log('Mongo Connection Closed')
    });
    connect.on('error', (error) => {
        console.log('Mongo Connection Error: '+ error)
    })
    await mongoose
    .connect(url)
    .catch((error) => console.log(error))
}


module.exports = {connectDB}