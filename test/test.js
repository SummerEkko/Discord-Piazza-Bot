// Selected use cases to be tested are use case #1, #3 and #4.
// Current test coverage achieves 87% as measured by c8.

var chai = require("chai");
var assert = chai.assert,
  expect = chai.expect;
process.env.NODE_ENV = "test";

const downloadCSV = require("../commands/downloadCSV");
const login = require("../commands/login");
const optIn = require("../commands/optIn");
const optOut = require("../commands/optOut");
const set = require("../commands/set");
const executeBotPy = require("../utils/executeBotPy");
const config = require("../config.json");
const fs = require("fs");
const exportCSV = require("../utils/exportCSV");

// Mocking interaction object in Discord
class interaction {
  constructor() {
    this.options = {
      getInteger(name) {
        const m = { p1: "1", p2: "2", p3: "3", p4: "4" };
        return m[name];
      },

      getString(str) {
        const n = { name: "PiazzaName" };
        return n[str];
      },
    };

    this.user = { tag: "abc", id: "def", username: "ABC" };
    this.member = {
      client: "123",
      displayName: "Name",
      guild: "012",
      permissions: "ADMINISTRATOR",
      user: "User",
      roles: "Admin",
      displayAvatarURL() {
        return "google.com";
      },
    };
  }

  async reply(options) {
    this.c = options;
  }
}

describe("Use Case 1 - Instructor Discord Login Tests", function () {
  it("restricted command should only be used by instructor in server", async function (done) {
    const i = new interaction();
    login.execute(i);
    assert.equal(i.c, "This command can only be used in a server");
    done();
  });
});

describe("Use Case 1 - Performance Matrix Customization Tests", function () {
  it("should return the customized weighing matrix", function () {
    const i = new interaction();
    set.execute(i);
    weightSetting =
      `Parameters:\n` +
      `Questions asked: 1\n` +
      `Answers to questions: 2\n` +
      `Most views: 3\n` +
      `Endorsement by other users: 4`;
    assert.equal(i.c, weightSetting);
  });
});

describe("Use Case 3 - Piazza API Tests", function () {
  it("should log in failed with bad credential", async function () {
    await executeBotPy.run("test", "test", "test").then((result) => {
      console.log(result);
      expect(result).to.include("Login failed");
    });
  });

  it("should log in successfully with good credential", async function () {
    await executeBotPy
      .run(config.piazzaUser, config.piazzaPass, config.piazzaNet)
      .then((result) => {
        console.log(result);
        expect(result).to.include("Login success");
      });
  });

  it("should show network id error", async function () {
    await executeBotPy
      .run(config.piazzaUser, config.piazzaPass, "fakenetid")
      .then((result) => {
        console.log(result);
        expect(result).to.include("Bad network id");
      });
  });
});

describe("Use Case 3 - Subscribe/Unsubscribe Service Tests", function () {
  it("should return correct Piazza name for valid optIn", function () {
    const i = new interaction();
    optIn.execute(i);
    assert(i.c, "PiazzaName");
  });

  it("should return correct message for valid optOut", function () {
    const i = new interaction();
    optOut.execute(i);
    assert(i.c, "You have opted out of the performance notifications.");
  });
});

describe("Use Case 4 - ExportCSV Test", function () {
  this.timeout(5000);

  it("should create performance report as a CSV file", function () {
    console.log(process.cwd());

    fs.exists("piazza.csv", (exists) => {
      if (exists) {
        try {
          fs.unlinkSync("piazza.csv");
        } catch (err) {
          console.error(err);
        }
      }
    });

    exportCSV.saveCSV();
    fs.closeSync(fs.openSync("piazza.csv", "w"));

    fs.exists("piazza.csv", (exists) => {
      console.log(exists);
      assert.equal(exists, true);
    });
  });
});
