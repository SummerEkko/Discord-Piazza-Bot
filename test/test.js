var chai = require('chai');
var assert = chai.assert,
    expect = chai.expect;
process.env.NODE_ENV = 'test';

const downloadCSV = require('../commands/downloadCSV');
const login = require('../commands/login');
const optIn = require('../commands/optIn');
const optOut = require('../commands/optOut');
const set = require('../commands/set');
const executeBotPy = require('../utils/executeBotPy');
const config = require('../config.json');

const fs = require("fs");

const exportCSV = require('../utils/exportCSV')

describe("exportCSV test", function () {
    this.timeout(5000);

    it("should create file", function () {
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
                const m = {'p1': "1", 'p2': "2", 'p3': "3", 'p4': "4"}
                return m[name];
            }
        }

        this.user = {tag: "abc", id: "def", username: "ABC"}
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

describe("Set Tests", function () {
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
});

describe("executeBotPy test", function () {

    it("should log in failed", async function () {
        await executeBotPy.run('test','test','test').then(
            (result) => {
                console.log(result)
                expect(result).to.include('Login failed');
            }
        )
    })

    it("should log in successfully", async function () {
        await executeBotPy.run(config.piazzaUser, config.piazzaPass, config.piazzaNet).then(
            (result) => {
                console.log(result)
                expect(result).to.include('Login success');
            }
        )
    })

    it("should show network id error", async function () {
        await executeBotPy.run(config.piazzaUser, config.piazzaPass, 'fakenetid').then(
            (result) => {
                console.log(result)
                expect(result).to.include('Bad network id');
            }
        )
    })
});
