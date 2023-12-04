// https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database 
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
        mongo_json = await this.getData(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    return mongo_json
}

main();