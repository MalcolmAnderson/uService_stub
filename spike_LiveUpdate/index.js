//index.js
const schedule = require('node-schedule');
const express = require('express');
const fs = require('fs');
const bunyan = require('bunyan');
let config = require('config');

let configFileName = "./config/default.json";
let configCheckInSeconds = 1;
let displayFileCheckingDialog = false;
let infoLogFrequencyInSeconds = 5;
let errorLogFrequencyInSeconds = 5;
let quickconfigCheckFrequencyInSeconds = 10;

let configLastModifiedTime = getFileLastModifiedTimeInMilliseconds(configFileName);

let logConfiguration = config.get("Bunyan")
const log = bunyan.createLogger(logConfiguration);
let flipper = true;
//let log = bunyan.createLogger({ name: "myapp", level: "Error" });
//let bunyanLevel = config.get("Bunyan.level");
//console.log(bunyanLevel);
//log.level("INFO");

//const log = bunyan.createLogger({ name: "myapp", level: "Info" });

let valuesAreEqual = configLastModifiedTime == getFileLastModifiedTimeInMilliseconds(configFileName)


// var j = schedule.scheduleJob({ rule: `*/${configCheckInSeconds} * * * * *` }, function () {
//     if (configLastModifiedTime == getFileLastModifiedTimeInMilliseconds(configFileName)) {
//         if (displayFileCheckingDialog) {
//             console.log('no change to config file.');
//         }
//     } else {
//         if (displayFileCheckingDialog) {
//             console.log('Time for do the thing, and update the last modified time stamp!');
//         }
//         configLastModifiedTime = getFileLastModifiedTimeInMilliseconds(configFileName);
//         //log = bunyan.createLogger({ name: "myapp", level: "Info" });

//         //console.log(`logConfiguration: ${bunyanLevel}`);
//         //console.log(logConfiguration);

//         global.NODE_CONFIG = null;
//         delete require.cache.config;
//         var config = require('config');

//         delete require.cache[require.resolve('config')];
//         // config = require('config');
//         // logConfiguration = config.get("Bunyan")
//         // console.log(logConfiguration);
//         let bunyanLevel = config.get("Bunyan.level");
//         log.level = bunyanLevel;


//         //log = bunyan.createLogger(logConfiguration);

//         console.log(`logConfiguration: ${bunyanLevel}`);
//         //console.log(logConfiguration);
//         //log.level = bunyanLevel;
//     }
// });

var k = schedule.scheduleJob({ rule: `*/${infoLogFrequencyInSeconds} * * * * *` }, function () {
    log.info({ infoPayload: 'INFO log entry' });
});

var m = schedule.scheduleJob({ rule: `*/${errorLogFrequencyInSeconds} * * * * *` }, function () {
    log.error({ errorPayload: 'ERROR log entry' });
});

var n = schedule.scheduleJob({ rule: `*/${quickconfigCheckFrequencyInSeconds} * * * * *` }, function () {
    //delete require.cache[require.resolve('log')];
    //log = bunyan.createLogger(logConfiguration);
    //console.log(config.get("Bunyan.level"));
    if (flipper) {
        log.level = "INFO";
    } else {
        log.level = "ERROR";
    }
    flipper = !flipper;
    console.log(flipper);
    console.log(log.level);
});

app = express();

app.listen(3128);

function getFileLastModifiedTimeInMilliseconds(fileName) {

    // TODO add try catch block, throw ugly exception if file not found

    return fs.statSync(fileName).mtimeMs;

    // let stats = fs.statSync(fileName);
    // return stats.mtimeMs 

};


