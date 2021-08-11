const os = require('os');
const log = require('./logger');

var eventLoop = 1;

setInterval(() => {
    process.stdout.write('\x1Bc'); 

    const {freemem, totalmem} = os;

    const total = parseInt(totalmem() / 1024 / 1024);
    const mem = parseInt(freemem() / 1024 / 1024);
    const percents = parseInt((mem / total) * 100);


    const stats = {
        actionNumber: eventLoop,
        free: `${mem} MB`,
        total: `${total} MB`,
        usage: `${percents}%`
    }

    console.log('=== PC STATUS === ');
    console.table(stats);

    log(`${JSON.stringify(stats)}\n`);
    eventLoop++;
}, 1000)


