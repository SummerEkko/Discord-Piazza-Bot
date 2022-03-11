var chai = require('chai');
var assert = chai.assert,
    expect = chai.expect;

const fs = require("fs");

const exportCSV = require('../utils/exportCSV')

describe("exportCSV test", function () {
    this.timeout(5000);

    it("should create file",  function (   ) {
        console.log(process.cwd())

        fs.exists('piazza.csv', (exists) => {
            if (exists) {
                try {
                    fs.unlinkSync('piazza.csv');
                } catch (err) {
                    console.error(err)
                }
            }
        });

        exportCSV.saveCSV();
        fs.closeSync(fs.openSync('piazza.csv', 'w'));

        fs.exists('piazza.csv', (exists) => {
            console.log(exists)
            assert.equal(exists, true);
        });
    })
});







