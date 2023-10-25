import {connectDB} from "@/util/database"
// @ts-ignore
import bcrypt from 'bcrypt'
import {ObjectId} from "mongodb";

export default async function handler(req:any, res:any){

    const client = await connectDB;
    const db = client.db("forum");

    if(req.method == 'GET'){
        console.log("get test");
        return res.status(200).json("test ok");
    }

    if(req.method == 'POST'){
        // console.log(req.body.name)

        if(req.body.name == ''){
            return res.status(500).json("이름 써라...")
        }
        if(req.body.email == ''){
            return res.status(500).json("이메일 써라...")
        }
        if(req.body.password == ''){
            return res.status(500).json("비밀번호 써라...")
        }

        try{
            // 이메일 중복체크
            let check = await db.collection('member').findOne({
                email:req.body.email
            });

            if(check){
                return res.status(500).json("똑같은 놈 하나 있다....")
            }else{
                db.collection('member').insertOne({
                    name:req.body.name,
                    email:req.body.email,
                    password: await bcrypt.hash(req.body.password, 10),
                    role:"user"
                })
                res.redirect(302,"/list");
            }
        } catch(err){
            return res.status(500).json("오류남 ㅠㅠ")
        }

        // return res.status(200).json("test ok")
    }

}