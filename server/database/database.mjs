import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.DATABASE_URI);
try {
    await client.connect();
    console.log('db connect');
} catch (error) {
    console.log(error);
}
export default client;
