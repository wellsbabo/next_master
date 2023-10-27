'use client'

import {useEffect, useState} from "react";

export default function Comment(props:any){



    const [comment, setComment] = useState('');
    const [commentList, setCommentList] = useState([]);
    // console.log(props);

    async function getCommentList(parentId:String){
        await fetch('/api/comment?parentId=' + parentId, {
            method:'GET'
        }).then((r) => {
            if(r.status == 200){
                return r.json();
            }
        }).then((result) => {
            // console.log(result);
            setCommentList(result);
        })
    }

    async function registComment(comment:String){
        await fetch('/api/comment', {
            method:'POST',
            body:JSON.stringify({
                comment:comment,
                parentContentID:props.parentId
            })
        }).then((r) => {
            if(r.status == 200){
                getCommentList(props.parentId);
                setComment('');
            }
        })
    }

    useEffect(() => {

        const func = async() => {
            await getCommentList(props.parentId);
        }
        func();
    },[])


    return (
        <div>
            <div>
                <h4>댓글</h4>
                {
                    (commentList.length > 0)?(
                        commentList.map((data:any, index) =>
                                <p key={index}>{data.comment}</p>
                        )
                    ):(
                        <span></span>
                    )
                }
            </div>
            <input
                value = {comment}
                onChange={(e) => {setComment(e.target.value)}}
            />
            <button
                onClick = {() => {
                    registComment(comment);
                }}
            >
                댓글 등록
            </button>
        </div>
    )
}