import mongoose from "mongoose";

const MongoConnect = () => {
    console.log("execute mongo");
    mongoose.connect(process.env.MONGO_URI);

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => { console.log("connection success"); });

};

export default MongoConnect;