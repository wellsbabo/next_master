import {connectDB} from "@/util/database";

export default async function List(){

    const db = (await connectDB).db("forum");
    let result = await db.collection('post').find().toArray();
    console.log(result);

    return (
        <div className="list-bg">
            {
                result.map((data:any, index:number) => {
                    return(
                        <div className="list-item" key={index}>
                            <h4>{result[index].title}</h4>
                            <p>{result[index].content}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}