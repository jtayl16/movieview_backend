const http = require('http');
const fs = require('fs');
const path = require('path');

// Server is deployed to Render, so cannot use hardcoded port
const PORT = process.env.PORT;

http.createServer((req,res) => {
    console.log(req.url);
    if(req.url === '/') {
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err,content)=>{
            if(err) throw err;
            res.writeHead(200, {'Content-Type':'text/html'})
            res.end(content);
        })
    }
    else if(req.url === '/about') {
        fs.readFile(path.join(__dirname, 'public', 'about.html'), (err,content)=>{
            if(err) throw err;
            res.writeHead(200, {'Content-Type':'text/html'})
            res.end(content);
        })
    }
    else if(req.url === '/api') {
        fs.readFile(path.join(__dirname, 'public', 'db.json'), (err,content)=>{
            if(err) throw err;
            res.writeHead(200, {'Content-Type':'application/json'})
            res.end(content);
        })
    }
    else {
        res.writeHead(404, {'Content-Type':'text/html'})
        res.end("<h1> 404'd </h1>");
    }
}).listen(PORT, ()=>console.log("Server running on port " + PORT));