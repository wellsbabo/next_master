import {connectDB} from "@/util/database"
import { ObjectId } from "mongodb"
import Link from "next/link"

export default async function Detail(props:any){

    const db = (await connectDB).db("forum")
    let result = await db.collection('post').findOne({
        _id:new ObjectId(props.params.contentId)
    })

    // console.log(props.params.contentId)
  
    return (
        <div>
            <h4>상세페이지</h4>
            <form action="/api/edit" method="POST">
                <input name="title" defaultValue={result.title}></input>
                <input name="content" defaultValue={result.content}></input>
                <button type="submit">수정</button>
            </form>
        </div>
    )
}