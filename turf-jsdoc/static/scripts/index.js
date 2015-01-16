var turf = require('turf'),
    docs = require('./docs.json'),
    Rpl = require('rpl-www');

var runnable = document.getElementsByClassName('rpl-run');

for (var i = 0; i < runnable.length; i++) {
    new Rpl(runnable[i], {
        sandbox: {
            turf: turf
        },
        tips: docs.functions.map(fToTip)
    });
}

function fToTip(f) {
    return [f.name.replace('/', '.'), f.description];
}
