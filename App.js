const http = require('http');

const server = http.createServer(function(req,res){
    console.log(req.url,req.headers,req.method);
    //process.exit(); to quit the server
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<body><h1>Hello,First Node Program</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);
