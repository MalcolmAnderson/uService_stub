const http = require("http");
const fs = require("fs");
var count = 0;

const getTimeStamp = date => ({
    unix: date.getTime(),
    utc: date.toUTCString()
});

const requestHandler = (req, res) => {
    if(req.url === "/"){
        fs.readFile("views/index.html", "utf8", (err, html) => {
            if (err) throw err;

            res.writeHead(200, { "Content-Type": "text/html"});
            res.end(html);
        });
    } else if (req.url.startsWith("/count")){
        // does not work, should return the value "1"
        count++;
        res.writeHead(200, { "Content-Type": "text/html"});
        res.end(count);
    } else if (req.url.startsWith("/api/timestamp")){
            const dateString = req.url.split("/api/timestamp/")[1];
        let timestamp;

        if (dateString === undefined || dateString.trim() === ""){
            timestamp = getTimeStamp(new Date());
        } else if (dateString == "foo"){
            timestamp = "bar3"
        } else {
            const date = !isNaN(dateString)
                ? new Date(parseInt(dateString))
                : new Date(dateString);
            
            if (!isNaN(date.getTime())) {
                timestamp = getTimeStamp(date);
            } else {
                timestamp = {
                    error: "Invalid Date"
                };
            }
        }
        res.writeHead(200, { "Content-Type": "application/json"});
        res.end(timestamp);
    } else {
        fs.readFile("views/404.html", (err, html) =>{
            if (err) throw err;

            res.writeHead(404, {"Content-Type" : "text/html"});
            res.end(html);
        });
    }
};

const server = http.createServer(requestHandler);

server.listen(process.env.PORT || 4100, err => {

    if(err) throw err;

    console.log('Server running on PORT ${server.address().port}');

});
