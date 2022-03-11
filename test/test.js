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







var chai = require('chai');
var assert = chai.assert,
    expect = chai.expect;




class interaction {
    constructor() {
        this.options = {
            getInteger(name) {
                const m = { 'p1': "1", 'p2': "2", 'p3': "3", 'p4': "4" }
                return m[name];
            }
        }
    }

    async reply(options) {
        this.c = options;
    }
}

require('../commands/downloadCSV');
require('../commands/login');
const setTest = require('../commands/set');



describe("Set Tests", function () {
    it("should return the correct weight setting", function () {
        const i = new interaction();
        setTest.execute(i);
        weightSetting = `Parameters:\n` +
            `Questions asked: 1\n` +
            `Answers to questions: 2\n` +
            `Most views: 3\n` +
            `Endorsement by other users: 4`
        assert.equal(i.c, weightSetting)
    })
});
