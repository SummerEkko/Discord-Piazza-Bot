const {mongodb} = require('../config.json');
const mongoose = require("mongoose");
const json2csv = require('json2csv');
const fs = require('fs');
require('../models/TotalData')


function saveCSV() {
    mongoose.connect(mongodb).then(() => console.log('MongoDB connected in exportCSV.js')).catch(err => console.log(err));
    const TotalData = mongoose.model('totalData');
    TotalData.find({}).lean().exec(
        (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const csvFields = [];
                TotalData.schema.eachPath(path => csvFields.push(path));
                console.log(csvFields);
                const parser = new json2csv.Parser({fields: csvFields});
                const csvData = parser.parse(data);
                fs.writeFile('piazza.csv', csvData, err => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('File successfully written!');
                        mongoose.disconnect().then(r => console.log("MongoDB disconnected in exportCSV.js")).catch(err => console.log(err));
                    }
                });
            }
        }
    );
}

exports.saveCSV = saveCSV;