const http = require("http");
const fs = require("fs");
const url = require("url");

var count = 0;
var payload = "bar3";

const getTimeStamp = date => ({
    unix: date.getTime(),
    utc: date.toUTCString()
});

const requestHandler = (req, res) => {
    if (req.url === "/") {
        fs.readFile("views/index.html", "utf8", (err, html) => {
            if (err) throw err;

            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(html);
        });
    } else if (req.url.startsWith("/fooConfigure")) {
        const queryObject = url.parse(req.url, true).query;
        console.log(queryObject);
        // console.log(queryObject.bar);
        // console.log(queryObject.payload);
        // something something if newPayload == null or undefined
        payload = queryObject.payload;

        res.writeHead(200, { "Content-Type": "string" });
        console.log(payload);
        res.end(payload);
    } else if (req.url.startsWith("/count")) {
        count++;
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(count);
    } else if (req.url.startsWith("/foo")) {
        res.writeHead(200, { "Content-Type": "string" });
        console.log(payload);
        res.end(payload);
    } else {
        fs.readFile("views/404.html", (err, html) => {
            if (err) throw err;

            res.writeHead(404, { "Content-Type": "text/html" });
            res.end(html);
        });
    }

};

const server = http.createServer(requestHandler);

server.listen(process.env.PORT || 4100, err => {

    if (err) throw err;

    console.log('Server running on PORT ${server.address().port}');

});
