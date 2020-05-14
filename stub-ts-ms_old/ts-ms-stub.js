const http = require("http");
const https = require("https");
const fs = require("fs");
const fetch = require("node-fetch");

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
    } else if (req.url.startsWith("/api/timestamp")){
        const dateString = req.url.split("/api/timestamp/")[1];
        let timestamp;

        if (dateString === undefined || dateString.trim() === ""){
            timestamp = "good stuff";
        } else if (dateString == "foo"){
            console.log("so far so good");
            var fetchVal = fetch("http://localhost:4100/api/timestamp/foo")
                .then((response) => {console.log(response)})
                .catch((err) => {console.log(err)});
            console.log("printing fetchVal");
            console.log(fetchVal);
            timestamp = "mock";
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
        res.end(JSON.stringify(timestamp));
    } else {
        fs.readFile("views/404.html", (err, html) =>{
            if (err) throw err;

            res.writeHead(404, {"Content-Type" : "text/html"});
            res.end(html);
        });
    }
};

const server = https.createServer({
    key: fs.readFileSync('../../SSLPlayground/server.key'),
    cert: fs.readFileSync('../../SSLPlayground/server.cert')
}, requestHandler);

server.listen(process.env.PORT || 4000, err => {
     if(err) throw err;
     console.log('Server running on PORT ${server.address().port}');
});

// const options = {
//     key: fs.readFileSync('../../SSLPlayground/server.key'),
//     cert: fs.readFileSync('../../SSLPlayground/server.cert')
// };

// const server = https.createServer(options, function(req, res){
//     res.writeHead(200);
//     res.end("hello world\n");
// }).listen(4000);
