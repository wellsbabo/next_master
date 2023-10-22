import {connectDB} from "@/util/database"

export default async function handler(req:any, res:any){

    const client = await connectDB;
    const db = client.db("forum");

    if(req.method == 'GET'){
        console.log(123);
        return res.status(200).json('버전 그대로야?!')
    }

    if(req.method == 'POST'){
        // console.log(req.body.title);
        // console.log(req.body.content);

        if(req.body.title == ''){
            return res.status(500).json("제목써라..")
        }

        try{
            db.collection('post').insertOne({
                title:req.body.title,
                content:req.body.content
            })
            res.redirect(302,"/list");
        } catch(err){
            res.status(500).json("에러남 ㅠㅠ")
        }

    }

}