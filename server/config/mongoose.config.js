const mongoose = require('mongoose');

const db_name = process.env.DB;
const password = process.env.PASSWORD;

mongoose
	.connect(`mongodb+srv://projetFeedHope:${password}@cluster0.wly0tqq.mongodb.net/?retryWrites=true&w=majority`)
	.then(() => console.log(`Connection to the ${db_name} established successfully`))
	.catch(err => console.log('There is an error!! ', err));


	
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = `mongodb+srv://${user}:${password}@cluster0.wly0tqq.mongodb.net/?retryWrites=true&w=majority`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
