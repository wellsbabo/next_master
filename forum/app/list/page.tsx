import {connectDB} from "@/util/database";
import Link from "next/link";
import DetailLink from "./DetailLink";
import ListItem from "@/app/list/ListItem";

export const dynamic = 'force-dynamic'
// export const dynamic = 'force-static'

export default async function List(){

    const db = (await connectDB).db("forum");
    let result = await db.collection('post').find().toArray();

    const result_string = result.map((data:any, index:any) => {
        return {
            _id:data._id.toString(),
            title:data.title,
            content:data.content
        };
    })


    return (
        <div className="list-bg">
            <ListItem result={result_string}/>
        </div>
    )
}