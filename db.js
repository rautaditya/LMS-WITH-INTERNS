//db.js

const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

// const url = `mongodb+srv://adityaraut6029:e0DDFBbgIHhlK2Jp@cluster0.qwitk0p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const url=`mongodb://localhost:27017/vivaakstechnology`
// e0DDFBbgIHhlK2Jp
// adityaraut6029
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })