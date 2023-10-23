import {connectDB} from "@/util/database"
import { ObjectId } from "mongodb"
import Link from "next/link"

export default async function Detail(props:any){

    const db = (await connectDB).db("forum")
    let result = await db.collection('post').findOne({
        _id:new ObjectId(props.params.contentId)
    })

  
    return (
        <div>
            <h4>수정페이지</h4>
            <form action="/api/edit" method="POST">
                <input type="hidden" name="id" defaultValue={result._id.toString()}></input>
                <input name="title" defaultValue={result.title}></input>
                <input name="content" defaultValue={result.content}></input>
                <button type="submit">수정완료</button>
            </form>
        </div>
    )
}