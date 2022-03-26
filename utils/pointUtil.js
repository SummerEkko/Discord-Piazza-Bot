const pointJson = require('../point');

function getRoleName(point) {
    let roleName = '';
    Object.keys(pointJson).forEach(key => {
        if (pointJson[key] <= point) {
            roleName = key
        }
    });
    return roleName;
}

exports.getRoleName = getRoleName;
console.log(getRoleName(100));
