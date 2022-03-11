const {mongodb} = require('../config.json');
const mongoose = require("mongoose");
const json2csv = require('json2csv');
const fs = require('fs');
require('../models/PiazzaData')


function saveCSV() {
    mongoose.connect(mongodb).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));
    const PiazzaData = mongoose.model('piazzaData');
    PiazzaData.find({}).lean().exec(
        (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const csvFields = [];
                PiazzaData.schema.eachPath(path => csvFields.push(path));
                console.log(csvFields);
                const parser = new json2csv.Parser({fields: csvFields});
                const csvData = parser.parse(data);
                fs.writeFile('piazza.csv', csvData, err => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('File successfully written!');
                        mongoose.disconnect().then(r => console.log("mongodb disconnected")).catch(err => console.log(err));
                    }
                });
            }
        }
    );
}

exports.saveCSV = saveCSV;
