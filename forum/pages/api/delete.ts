import {connectDB} from "@/util/database";
import {ObjectId} from "mongodb";

export default async function handler(req:any, res:any){
    const db = (await connectDB).db("forum");

    if(req.method == 'POST'){
        try{
            await db.collection('post').deleteOne({
                _id: new ObjectId(req.body)
            })
            return res.status(200).json("delete");
        } catch(err){
            console.log(err);
            return res.status(500).json("error");
        }
    }
}