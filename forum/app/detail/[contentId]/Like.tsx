'use client'

import {useEffect, useState} from "react";

export default function Like(props:any){

    const [like, setLike] = useState(0);

    async function likeUp(){
        await fetch('/api/like',{
            method:'POST',
            body:props.parentId
        }).then((r) => {
            if(r.status == 200){
                // 수정 필요할듯? 누르면 새 값을 가져오는 걸로
                setLike(like+1);
            }
        })
    }

    async function getLike(){
        await fetch('/api/like?parentId=' + props.parentId,{
            method:'GET'
        }).then((r) => {
            if(r.status == 200){
                // console.log(r);
                return r.json();
            }
        }).then((result) => {
            setLike(result);
        })
    }

    useEffect(() => {
        const func = async() => {
            await getLike();
        }
        func();
    },[])


    return (
        <div>
            <span
                onClick = {() => {
                    likeUp();
                }}
            >
                💖
            </span>
            <span>
                좋아요 수: {like}
            </span>
        </div>
    )
}