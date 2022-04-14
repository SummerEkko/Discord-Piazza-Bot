const json2csv = require('json2csv');
const fs = require('fs');
require('../models/TotalData')


function saveCSV(mongoose) {
    const TotalData = mongoose.model('totalData');
    TotalData.find({}).lean().exec(
        (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const csvFields = [];
                TotalData.schema.eachPath(path => csvFields.push(path));
                const parser = new json2csv.Parser({fields: csvFields});
                const csvData = parser.parse(data);
                fs.writeFile('piazza.csv', csvData, err => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('File successfully written!');
                    }
                });
            }
        }
    );
}

exports.saveCSV = saveCSV;