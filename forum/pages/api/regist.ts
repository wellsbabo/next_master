import {connectDB} from "@/util/database"

export default async function handler(req:any, res:any){

    const client = await connectDB;
    const db = client.db("forum");

    if(req.method == 'GET'){
        console.log("get test");
        return res.status(200).json("test ok");
    }

    if(req.method == 'POST'){
        console.log(req.body.id)

        if(req.body.id == ''){
            return res.status(500).json("ID 써라...")
        }
        if(req.body.password == ''){
            return res.status(500).json("비밀번호 써라...")
        }

        try{
            db.collection('member').insertOne({
                id:req.body.id,
                password:req.body.password
            })
            res.redirect(302,"/list");
        } catch(err){
            return res.status(500).json("오류남 ㅠㅠ")
        }

        // return res.status(200).json("test ok")
    }

}