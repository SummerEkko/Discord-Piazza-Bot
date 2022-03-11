var chai = require('chai');
var assert = chai.assert,
    expect = chai.expect;
process.env.NODE_ENV = 'test';

const downloadCSV = require('../commands/downloadCSV');
const login = require('../commands/login');
const optIn = require('../commands/optIn');
const optOut = require('../commands/optOut');
const set = require('../commands/set');
const user = require('../commands/user');
const index = require('../index');
const deployCommands = require('../deploy-commands');
const executeBotPy = require('../utils/executeBotPy');

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


class interaction {
    constructor() {
        this.options = {
            getInteger(name) {
                const m = { 'p1': "1", 'p2': "2", 'p3': "3", 'p4': "4" }
                return m[name];
            }
        }

        this.user = { tag: "abc", id: "def", username: "ABC" }
        this.member = {
            client: "123", displayName: "Name", guild: "012",
            permissions: "ADMINISTRATOR", user: "User", roles: "Admin",
            displayAvatarURL() {
                return "google.com";
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
describe("WeatherBot Tests", function () {

    // this.timeout(5000);
    // it("login test", function() {
    //     const i = new interaction();
    //     login.execute(i);
    //     assert.equal(i.c, "This command can only be used in a server");
    // });

    // it("csv test", async function() {
    //     const i = new interaction();
    //     let result = await downloadCSV.execute(i);
    //     assert.equal(i.c.content, "CSV file generated.");
    // });

    it("should return the correct weight setting", function () {
        const i = new interaction();
        set.execute(i);
        weightSetting = `Parameters:\n` +
            `Questions asked: 1\n` +
            `Answers to questions: 2\n` +
            `Most views: 3\n` +
            `Endorsement by other users: 4`
        assert.equal(i.c, weightSetting)
    })

    it("should return the correct user info", function () {
        const i = new interaction();
        user.execute(i);
        userStr = `Your tag: abc\nYour id: def\nYour username: ABC\nclient: "123"\n\ndisplayName: Name\n`
            + `guild: 012\npermissions: "ADMINISTRATOR"\nuser: User\ndisplayAvatarURL(): google.com\n`;
        assert.equal(i.c, userStr);
    })

});
