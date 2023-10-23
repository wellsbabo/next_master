'use client'

import Link from "next/link";
import DetailLink from "@/app/list/DetailLink";

export default function ListItem(props:any){
    return (
        <div>
            {
                props.result.map((data:any, index:number) => {
                    return(
                        <div key={index} >

                                <div className="list-item" >
                                    <Link href={"/detail/"+data._id} >
                                        <h4>{props.result[index].title}</h4>
                                    </Link>
                                    <span onClick={() => {
                                        fetch('/api/delete',{
                                            method: 'POST',
                                            body:data._id
                                        }).then(()=>{
                                        })
                                    }}>🗑</span>
                                </div>
                        </div>
                    )
                })
            }
        </div>
    )
}