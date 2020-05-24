//index.js
const cron = require('node-cron');
const schedule = require('node-schedule');
const express = require('express');
const fs = require('fs');

let configFileName = "./config.config";
let configCheckInSeconds = 2;
let configLastModifiedTime = getFileLastModifiedTimeInMilliseconds(configFileName);

// console.log(`configLastModifiedTime:                  "${configLastModifiedTime}"`);
// console.log(`getFileLastModifiedTime(configFileName): "${getFileLastModifiedTimeInMilliseconds(configFileName)}"`);
let valuesAreEqual = configLastModifiedTime == getFileLastModifiedTimeInMilliseconds(configFileName)

// console.log('valuesAreEqual == ' + valuesAreEqual);

var j = schedule.scheduleJob({ rule: `*/${configCheckInSeconds} * * * * *` }, function () {
    if(configLastModifiedTime == getFileLastModifiedTimeInMilliseconds(configFileName)){
        console.log('no change to config file.');
    } else {
        console.log('Time for do the thing, and update the last modifide time stamp!');
        configLastModifiedTime = getFileLastModifiedTimeInMilliseconds(configFileName);
    }
});

app = express();

app.listen(3128);

function getFileLastModifiedTimeInMilliseconds(fileName) {

    // TODO add try catch block, throw ugly exception if file not found

    return fs.statSync(fileName).mtimeMs;

    // let stats = fs.statSync(fileName);
    // return stats.mtimeMs 

};


