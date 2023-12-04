const {MongoClient} = require('mongodb')
const uri = "mongodb+srv://jtayl:Drowssap1@cluster0.z25ivv7.mongodb.net/?retryWrites=true&w=majority";


async function getListDatabase(client) {
    // db("database name").collection("collectionname")
    dbList = await client.db().admin().listDatabases(); // list of databases
    console.log("List of databases:");
    console.log(dbList['databases'])
}

// connection is an asych process
async function main() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Server opened");
    } catch(e) {
        console.log(e);
    } finally {
      await client.close();
      console.log("Server closed");
    }
}

main();