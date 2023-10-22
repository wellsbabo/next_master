import {connectDB} from "@/util/database"
import { ObjectId } from "mongodb"
import Link from "next/link"

export default async function Detail(props:any){

    const db = (await connectDB).db("forum")
    let result = await db.collection('post').findOne({
        _id:new ObjectId(props.params.contentId)
    })

    console.log(props.params.contentId)
  
    return (
            <div>
                <h4>상세페이지</h4>
                <h4>{result.title}</h4>
                <p>{result.content}</p>
                <Link href={"/edit/" + props.params.contentId}>
                    <button>수정</button>
                </Link>
            </div>
    )
}