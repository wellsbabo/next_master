'use client'

import {connectDB} from "@/util/database"
import { ObjectId } from "mongodb"
import Link from "next/link"
import Comment from "@/app/detail/[contentId]/Comment";
import Like from "@/app/detail/[contentId]/Like";
import {useEffect, useState} from "react";
import {notFound} from "next/navigation";

export default function Detail(props:any){

    type contentType = {
        _id: String,
        title: String,
        content: String,
        author: String
    }

    const[detail, setDetail] = useState<contentType>({
        _id: "",
        title: "",
        content: "",
        author:""
    });

    async function getDetail(contentId:String){
        await fetch('/api/detail?contentId=' + contentId,{
            method:'GET'
        }).then((r) => {
                if(r.status == 200){
                    return r.json()
                }
            }).then((result) =>{
                setDetail({
                    _id:result._id,
                    title:result.title,
                    content:result.content,
                    author:result.author
                });
            })
            .catch(() => {
                return notFound();
            })
    }


    useEffect(() => {
        const func = async() => {
            await getDetail(props.params.contentId);
        };
        func();
    },[])
  
    return (
            <div>
                <h4>상세페이지</h4>
                <h4>{detail.title}</h4>
                <p>{detail.content}</p>
                <Link href={"/edit/" + props.params.contentId}>
                    <button>수정</button>
                </Link>
                <Comment parentId={props.params.contentId}/>
                <Like parentId={props.params.contentId}/>
            </div>
    )
}
