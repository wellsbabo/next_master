import {connectDB} from "@/util/database"
import { getServerSession } from 'next-auth';
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req:any, res:any){

    const client = await connectDB;
    const db = client.db("forum");

    let session = await getServerSession(req, res, authOptions);
    // console.log(session);



    if(req.method == 'GET'){
        // console.log(123);
        console.log(req.query);
        return res.status(200).json('버전 그대로야?!')
    }

    if(req.method == 'POST'){
        if(session){
            req.body.author = session.user?.email;
        }
        // console.log(req.body.title);
        // console.log(req.body.content);

        if(req.body.title == ''){
            return res.status(500).json("제목써라..")
        }

        try{
            db.collection('post').insertOne({
                title:req.body.title,
                content:req.body.content,
                author:req.body.author
            
            })
            res.redirect(302,"/list");
        } catch(err){
            res.status(500).json("에러남 ㅠㅠ")
        }

    }

}