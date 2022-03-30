const mongoose = require("mongoose");

const {mongodb} = require("../config.json");
mongoose.connect(mongodb).then(() => console.log('MongoDB Connected in listCollections.js')).catch(err => console.log(err));

mongoose.connection.on('open', () => {
    mongoose.connection.db.listCollections().toArray().then(
        (collections) => {
            console.log(collections);
        }
    ).then(() => {
        mongoose.connection.close().then(r => console.log('MongoDB Disconnected'));
    });
});
