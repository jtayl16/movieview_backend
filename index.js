const http = require('http');
const fs = require('fs');
const path = require('path');

// server is deployed to Render, so can't use a hardcoded port
const PORT = process.env.PORT;

const {MongoClient} = require('mongodb')

async function getData(client){    // retrieve data, convert to array, convert array into JSON format
    const cursor = client.db("movies").collection("moviedetails").find({});
    const results = await cursor.toArray();
    const js = JSON.stringify(results);
    //console.log(js);
    return js
}

async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://jtayl:Drowssap1@cluster0.z25ivv7.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        mongo_json = await getData(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    return mongo_json
}

http.createServer((req,res) => {
    console.log(req.url);
    if(req.url === '/') {   // home page
        // readFile(current directory, folder, file)
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
        // grab from mongodb
        try {
            content = main();
        } catch (e) {
            console.log(e);
        } finally {
            res.writeHead(200, {
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin': '*'
            })
            res.end(content)
        }
        
        /**fs.readFile(path.join(__dirname, 'public', 'db.json'), (err,content)=>{
            if(err) throw err;
            res.writeHead(200, {
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin': '*'
            })
            res.end(content)
        }) */
    }
    else {
        res.writeHead(404, {'Content-Type':'text/html'})
        res.end("<h1> 404'd </h1>");
    }
}).listen(PORT, ()=>console.log('Server running on port ${PORT}'));