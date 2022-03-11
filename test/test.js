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
const config = require('../config.json');

class interaction {
    constructor() {
        this.options = {
            getInteger(name) {
                const m = { 'p1': "1", 'p2': "2", 'p3': "3", 'p4': "4" }
                return m[name];
            },

            getString(str) {
                const n = {'name': "PiazzaName"}
                return n[str];
            }
        }

        // this.user = { tag: "abc", id: "def", username: "ABC" }
        // this.member = {
        //     client: "123", displayName: "Name", guild: "012",
        //     permissions: "ADMINISTRATOR", user: "User", roles: "Admin",
        //     displayAvatarURL() {
        //         return "google.com";
        //     }
        // }
    }

    async reply(options) {
        this.c = options;
    }
}

describe("Bot Tests", function () {

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

    // it("should return the correct user info", function () {
    //     const i = new interaction();
    //     user.execute(i);
    //     userStr = `Your tag: abc\nYour id: def\nYour username: ABC\nclient: "123"\n\ndisplayName: Name\n`
    //         + `guild: 012\npermissions: "ADMINISTRATOR"\nuser: User\ndisplayAvatarURL(): google.com\n`;
    //     assert.equal(i.c, userStr);
    // })

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

describe("optIn and optOut tests", function() {
    it("should return correct Piazza name for valid optIn", function() {
        const i = new interaction();
        optIn.execute(i);
        assert(i.c, "PiazzaName");
    });

    it("should return correct message for valid optOut", function() {
        const i = new interaction();
        optOut.execute(i);
        assert(i.c, "You have opted out of the performance notifications.")
    });
});