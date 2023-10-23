import {connectDB} from "@/util/database"
import {ObjectId} from "mongodb";

export default async function handler(req:any, res:any){
    const client = await connectDB;
    const db = client.db("forum");
    let result = await db.collection('post').findOne({

    })


    if(req.method == 'POST') {

        // console.log(req.body.id);

        if(req.body.title ==''){
            return res.status(500).json("제목써라..");
        }

        try {
            await db.collection('post').updateOne(
                {_id: new ObjectId(req.body.id)},
                {$set :
                        {
                            title:req.body.title,
                            content:req.body.content
                        }
                    }
            )
            res.redirect(302,"/list");
        } catch (err) {
            res.status(500).json("에러남 ㅠㅠ");
        }
    }
}