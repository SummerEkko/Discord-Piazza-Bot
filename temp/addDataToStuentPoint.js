const mongoose = require("mongoose");
const {mongodb} = require("../config.json");
require('../models/Student');

mongoose.connect(mongodb).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));
const studentPoint = mongoose.model('student');


const zhiyuan = new studentPoint({
    Name: "zhiyuan",
    DiscordId: "516753760207503410",
    Point: 0,
    Email: "asss",
    Option: true
});

zhiyuan.save().then(() => console.log('Saved')).catch(err => console.log(err));

const rachel = new studentPoint({
    Name: "rachel",
    DiscordId: "607064616333213734",
    Point: 10,
    Email: "asss",
    Option: true
});

rachel.save().then(() => console.log('Saved')).catch(err => console.log(err)).then(() => mongoose.connection.close());

