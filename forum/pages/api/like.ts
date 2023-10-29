import {connectDB} from "@/util/database";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {ObjectId} from "mongodb";

export default async function handler(req:any, res:any){
    const db = (await connectDB).db("forum");
    // @ts-ignore
    let session = await getServerSession(req,res,authOptions);


    if(req.method == 'POST'){
        if(session == null){
            return res.status(500).json("로그인해라...");
        }

        try{
            let result = db.collection('like').findOne({
                author:session?.user?.email,
                parentId:new ObjectId(req.body)
            })

            // if(result != null)
            // console.log(result);

            if(result != null){
                console.log("값 있음")
                return res.status(500).json("이미 좋아요함")
            }

        }catch(err){
            return res.status(500).json("에러남 ㅠㅠ")
        }

        // 이미 좋아요 했는지 검증
        


        // json 값에 체크를 추가해서 좋아요를 이미했으면 좋아요 취소, 안했으면 좋아요 증가


        try{
            db.collection('like').insertOne({
                author:session?.user?.email,
                parentId:new ObjectId(req.body)
            })
            return res.status(200).json(1);
        }catch (err){
            return res.status(500).json("error");
        }
    }

}