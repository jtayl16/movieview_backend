const http = require('http');
const fs = require('fs');
const path = require('path');

// Server is deployed to Render, so cannot use hardcoded port
const PORT = process.env.PORT;
// Client instance for MongoDB query
const {MongoClient} = require('mongodb')

async function getData(client){    // Retrieve data, convert data => array => JSON
    const cursor = client.db("movies").collection("moviedetails").find({});
    const results = await cursor.toArray();
    //const js = JSON.stringify(results);
    return results;
}

async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    // In a normal scenario, URI should be hidden; for simplicity, it is visible
    const uri = "mongodb+srv://jtayl:Drowssap1@cluster0.z25ivv7.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    let mongo_json;

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        mongo_json = await getData(client);
        // Make the appropriate DB calls
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    return mongo_json;
}

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
        // Get JSON from async MongoDB query
        // getting closer; current result is unformatted and can't be read by VueJS
        main().then(ct => {
            let content = JSON.parse(ct);
            res.writeHead(200, {'Content-Type':'application/json'})
            res.end(content)
        }, (error) => {
            console.log(error);
        })
    }
    else {
        res.writeHead(404, {'Content-Type':'text/html'})
        res.end("<h1> 404'd </h1>");
    }
}).listen(PORT, ()=>console.log("Server running on port " + PORT));