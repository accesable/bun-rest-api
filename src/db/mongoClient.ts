import { MongoClient,ServerApiVersion } from "mongodb";
const uri = "mongodb+srv://trannhutanh654:cY8cqqyZeyGYBBDw@bunecom.l1im4.mongodb.net/?retryWrites=true&w=majority&appName=BunEcom";

// mongodb+srv://trannhutanh654:<db_password>@bunecom.l1im4.mongodb.net/?retryWrites=true&w=majority&appName=BunEcom

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function connectToMongo() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("bun_ecom").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    return client.db("bun_ecom")
  } catch(err) {
    // Ensures that the client will close when you finish/error
     console.error(`Failed to connect MongoDB: ${err.message}`);  // Log the error message
    console.error("Full error details:", err);  // Optional: Log the full error object for debugging
    throw new Error(`MongoDB connection failed: ${err.message}`);  // Include the original error message 
  }
}
