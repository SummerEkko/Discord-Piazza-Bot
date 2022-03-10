const {mongodb} = require('./config.json');
const mongoose = require("mongoose");
const json2csv = require('json2csv');
const fs = require('fs');
require('./models/PiazzaData')

mongoose.connect(mongodb).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

const PiazzaData = mongoose.model('piazzaData');

PiazzaData.find({}).then(data => console.log(data));
PiazzaData.schema.eachPath(path => console.log(path));

// new PiazzaData({
//     QuestionsAsked: 1,
//     AnswersToQuestions: 1,
//     MostViews: 1,
//     EndorsementByOtherUsers: 1,
// }).save().then(r => console.log(r));

const exportCSV = require('./utils/exportCSV');
exportCSV.saveCSV();