const spawn = require('child_process').spawn;


async function run(email, password, networkId) {
    console.log(process.cwd());
    let returnValue = 'returnValue';
    const botPy = spawn('python3', ['bot.py', email, password, networkId]);
    return new Promise((resolve) => {
        botPy.stdout.on('data', (data) => {
            returnValue = data.toString();
        });
        botPy.stderr.on('data', (data) => {
            returnValue = data.toString();
        });
        botPy.on('close', (code) => {
            resolve(returnValue);
        });
    });
}

exports.run = run;
