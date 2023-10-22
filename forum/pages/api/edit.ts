import {connectDB} from "@/util/database"

export default async function handler(){
    const client = await connectDB;
    const db = client.db("forum");

    
}