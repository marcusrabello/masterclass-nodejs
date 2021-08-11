const os = require('os');

var eventLoop = 0;

setInterval(() => {
    //console.clear();
    process.stdout.write('\x1Bc'); 

    const {freemem, totalmem} = os;

    const total = parseInt(totalmem() / 1024 / 1024);
    const mem = parseInt(freemem() / 1024 / 1024);
    const percents = parseInt((mem / total) * 100);

    const stats = {
        free: `${mem} MB`,
        total: `${total} MB`,
        usage: `${percents}%`
    }

    eventLoop++;

    console.log('=== PC STATUS ' + eventLoop + ' === ');
    console.table(stats);
}, 1000)


