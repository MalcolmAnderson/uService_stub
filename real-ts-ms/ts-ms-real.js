const http = require("http");
const fs = require("fs");
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
    } else if (req.url.startsWith("/count")) {
        // does not work, should return the value "1"
        count++;
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(count);
    } else if (req.url.startsWith("/foo")) {
        //timestamp = "bar"
        // res.writeHead(200, { "Content-Type": "application/json" });
        res.writeHead(200, { "Content-Type": "string" });
        console.log(typeof (payload));
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
