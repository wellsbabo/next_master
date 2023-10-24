import {connectDB} from "@/util/database";
import {ObjectId} from "mongodb";
import {getServerSession} from 'next-auth'
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req:any, res:any){
    const db = (await connectDB).db("forum");


    let session = await getServerSession(req, res, authOptions);



    if(req.method == 'DELETE'){
        try{
            let content = await db.collection('post').findOne({
                _id:new ObjectId(req.body)
            });

            console.log(content.author);

            if(content.author == session?.user?.email){
                let result = await db.collection('post').deleteOne({
                    _id: new ObjectId(req.body)
                })
                return res.status(200).json("삭제완료");
            }else{
                return res.status(500).json("권한 없음");
            }


        } catch(err){
            console.log(err);
            return res.status(500).json("error");
        }
    }

        // try{
        //     await db.collection('post').deleteOne({
        //         _id: new ObjectId(req.body)
        //     })
        //     return res.status(200).json("삭제완료");
        // } catch(err){
        //     console.log(err);
        //     return res.status(500).json("error");
        // }
}