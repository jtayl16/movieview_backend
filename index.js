// crucial for final project to host and display db.json
//final project: node js, replace public folder with website, vue js, change api link in nodejs to server link 
// if you use mongodb you don't need db.json - fetch from mongodb
// host nodejs app in netlify; need to update vuejs links
//vue localhost, nodejs in cloud (netlify as server)

const http = require('http');
const fs = require('fs');
const path = require('path');

// server is deployed to Render, so can't use a hardcoded port
const PORT = process.env.PORT;

http.createServer((req,res) => {
    console.log(req.url);
    if(req.url === '/') {   // home page
        // readFile(current directory, folder, file)
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err,content)=>{
            if(err) throw err;
            res.writeHead(200, {'Content-Type':'text/html'})
            res.end(content)
        })
    }
    else if(req.url === '/about') {
        fs.readFile(path.join(__dirname, 'public', 'about.html'), (err,content)=>{
            if(err) throw err;
            res.writeHead(200, {'Content-Type':'text/html'})
            res.end(content)
        })
    }
    else if(req.url === '/api') {
        fs.readFile(path.join(__dirname, 'public', 'db.json'), (err,content)=>{
            if(err) throw err;
            res.writeHead(200, {
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin': '*'
            })
            res.end(content)
        })
    }
    else {
        res.writeHead(404, {'Content-Type':'text/html'})
        res.end("<h1> 404'd </h1>");
    }
}).listen(PORT, ()=>console.log('Server running on port ${PORT}'));