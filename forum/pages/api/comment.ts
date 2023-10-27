import {connectDB} from "@/util/database";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {ObjectId} from "mongodb";

export default async function handler(req:any, res:any){
    const db = (await connectDB).db("forum");

    // @ts-ignore
    let session = await getServerSession(req,res,authOptions);

    if(req.method == 'GET'){
        try{
            // console.log(req.query.parentId);
            let result = await db.collection('comment').find({
                parentId:new ObjectId(req.query.parentId)
            }).toArray();
            // console.log(result);
            return res.status(200).json(result);
        } catch(err){
            return res.status(500).json("실패...");
        }
    }



    if(req.method == 'POST'){

        let body = (JSON.parse(req.body));

        // console.log(body);

        if(body.comment == ""){
            return res.status(500).json("내용 없다...");
        }
        if(session == null){
            return res.status(500).json("로그인해라...");
        }
        try{
            db.collection('comment').insertOne({
                author:session?.user?.email,
                comment:body.comment,
                parentId:new ObjectId(body.parentContentID)
            })

            return res.status(200).json("");


        }catch (err){
            console.log(err);
            return res.status(500).json("error");
        }
    }

}