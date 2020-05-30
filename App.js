const http = require('http');
const fs = require('fs');

const server = http.createServer(function(req,res){
    //console.log(req.url,req.headers,req.method);
    //process.exit(); to quit the server
    const url = req.url;
    const method = req.method;
    

    if(url === "/"){
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<body><form action ="/message" method ="POST"><input type = "text" name="message"><button>Click Me!</buttton></body>');
    res.write('</html>');
    return res.end();
    }
    if(url === "/message" && method ==="POST"){
        const body =[];
        req.on('data',(chunk) =>{
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end',() =>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt',message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end();        
            });
            
        });
        
        
    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<body><h1>Hello,First Node Program</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);
