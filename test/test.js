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
