//index.js
const schedule = require('node-schedule');
const express = require('express');
const fs = require('fs');
const bunyan = require('bunyan');
let config = require('config');
const sleep = require('sleep');

let configFileName = "./config/default.json";
let configCheckInSeconds = 1;
let displayFileCheckingDialog = false;
let infoLogFrequencyInSeconds = 5;
let errorLogFrequencyInSeconds = 5;
let quickconfigCheckFrequencyInSeconds = 10;

let count = 0;

let configLastModifiedTime = getFileLastModifiedTimeInMilliseconds(configFileName);

let logConfiguration = config.get("Bunyan")
const log = bunyan.createLogger(logConfiguration);
// let flipper = true;

let valuesAreEqual = configLastModifiedTime == getFileLastModifiedTimeInMilliseconds(configFileName)

function longRunningProcess() {
    count++;
    for (let i = 0; i < 5; i++) {
        log.info({ lrpStatus: 'step ' + i + 'of 5' });
        sleep.sleep(7);
    }
    count--;
}




// var k = schedule.scheduleJob({ rule: `*/${infoLogFrequencyInSeconds} * * * * *` }, function () {
//     log.info({ infoPayload: 'INFO log entry' });
// });

// var m = schedule.scheduleJob({ rule: `*/${errorLogFrequencyInSeconds} * * * * *` }, function () {
//     log.error({ errorPayload: 'ERROR log entry' });
// });

// var n = schedule.scheduleJob({ rule: `*/${quickconfigCheckFrequencyInSeconds} * * * * *` }, function () {
//     //delete require.cache[require.resolve('log')];
//     //log = bunyan.createLogger(logConfiguration);
//     //console.log(config.get("Bunyan.level"));
//     if (flipper) {
//         log.level = "INFO";
//     } else {
//         log.level = "ERROR";
//     }
//     flipper = !flipper;
//     console.log(flipper);
//     console.log(log.level);
// });

app = express();

app.listen(3128);

app.get('/', function (req, res) {
    res.send('Hello World 1')
    //res.send('Hello World2')
});


app.get('/add', function (req, res) {
    res.send('Added an item to the process')
    longRunningProcess();
});


app.get('/count', function (req, res) {
    res.send(count + " items running");
    //res.send('Hello World2')
});



function getFileLastModifiedTimeInMilliseconds(fileName) {

    // TODO add try catch block, throw ugly exception if file not found

    return fs.statSync(fileName).mtimeMs;

    // let stats = fs.statSync(fileName);
    // return stats.mtimeMs 

};

