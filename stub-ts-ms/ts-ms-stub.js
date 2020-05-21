var express = require('express')
var fs = require('fs')
var https = require('https')
var request = require('request')
var app = express()
var usageCount = 0;

app.get('', function (req, res) {
    console.log('ts-ms-stub start');
    res.redirect('https://localhost:4000/foo')
})

app.get('/foo', function (req, res) {
    console.log('ts-ms-stub start');
    // res.send('foo') -- Sends initial header 
    //request.get('http://localhost:4100/api/timestamp/foo', function(error, response, body){
    request.get('http://localhost:4100/foo', function (error, response, body) {
        console.log("Sending external GET")
        console.log("s_Code: ", response && response.statusCode)
        console.log('body: ', body)

        //set body to a varaible
        let bodyVar = body;
        let s1 = new String('test')
        console.log(s1);
        console.log("body assigned to bodyVar: ", bodyVar)

        //confirm that we can assign body to a variable that we can then manipulate
        //TRUE  console.log('bar' == 'bar')
        //console.log(bodyCompare.equals(bodyVar));
        //bodyVar = Object.prototype.toString.call(bodyVar);
        if (bodyVar == 'bar') {
            console.log("Sending bar2");
            res.send("bar2")
        } else {
            console.log("Sending body")
            res.send(body)
        }
    });

})

app.get('/foo2', function (req, res) {
    usageCount++;
    console.log('Times called == ' + usageCount);
    console.log('Now in the app.get() method');
    res.send('foo2')

})




https.createServer({
    // key: fs.readFileSync('./cert/server.key'),
    // cert: fs.readFileSync('./cert/server.cert')
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app)
    .listen(4000, function () {

        console.log("Now in .listen() method port 4000");
        console.log("Must use https://localhost:4000/foo");
    })