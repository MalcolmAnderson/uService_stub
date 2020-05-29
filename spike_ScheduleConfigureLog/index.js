//index.js
const schedule = require('node-schedule');
const express = require('express');
const fs = require('fs');
const bunyan = require('bunyan');
const config = require('config');

let configFileName = "./config/default.json";

let displayFileCheckingDialog = false;

let configCheckInSeconds = 1;
let infoLogFrequencyInSeconds = 5;
let errorLogFrequencyInSeconds = 5;

let configLastModifiedTime = getFileLastModifiedTimeInMilliseconds(configFileName);

let logConfiguration = config.get("Bunyan")
const log = bunyan.createLogger(logConfiguration);
//const log = bunyan.createLogger({ name: "myapp", level: "Info" });

let valuesAreEqual = configLastModifiedTime == getFileLastModifiedTimeInMilliseconds(configFileName)


var j = schedule.scheduleJob({ rule: `*/${configCheckInSeconds} * * * * *` }, function () {
    if (configLastModifiedTime == getFileLastModifiedTimeInMilliseconds(configFileName)) {
        if (displayFileCheckingDialog) {
            console.log('no change to config file.');
        }
    } else {
        if (displayFileCheckingDialog) {
            console.log('Time for do the thing, and update the last modified time stamp!');
        }
        configLastModifiedTime = getFileLastModifiedTimeInMilliseconds(configFileName);
    }
});

var k = schedule.scheduleJob({ rule: `*/${infoLogFrequencyInSeconds} * * * * *` }, function () {
    log.info({ infoPayload: 'INFO log entry' });
});

var m = schedule.scheduleJob({ rule: `*/${errorLogFrequencyInSeconds} * * * * *` }, function () {
    log.error({ errorPayload: 'ERROR log entry' });
});

app = express();

app.listen(3128);

function getFileLastModifiedTimeInMilliseconds(fileName) {

    // TODO add try catch block, throw ugly exception if file not found

    return fs.statSync(fileName).mtimeMs;

    // let stats = fs.statSync(fileName);
    // return stats.mtimeMs 

};


