import {connectDB} from "@/util/database";
import Link from "next/link";
import DetailLink from "./DetailLink";


export default async function List(){

    const db = (await connectDB).db("forum");
    let result = await db.collection('post').find().toArray();
    // console.log(result);

    return (
        <div className="list-bg">
            {
                result.map((data:any, index:number) => {
                    return(
                        <div key={index} >
                            <Link href={"/detail/"+data._id} >
                                <div className="list-item" >
                                    <h4>{result[index].title}</h4>
                                    <p>{result[index].content}</p>
                                </div>
                            </Link>
                        <DetailLink></DetailLink>
                        </div>
                    )
                })
            }
        </div>
    )
}