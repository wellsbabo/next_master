import {connectDB} from "@/util/database";
import {ObjectId} from "mongodb";

export default async function handler(req:any, res:any){
    const db = (await connectDB).db("forum");

    if(req.method == 'GET'){
        try{
            let result = await db.collection('post').findOne({
                _id:new ObjectId(req.query.contentId)
            })
            return res.status(200).json(result);
        } catch (err){
            return res.status(500).json("실패...")
        }
    }

}