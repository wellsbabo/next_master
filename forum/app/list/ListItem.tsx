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
                                    <span onClick={(e) => {
                                        fetch('/api/delete',{
                                            method: 'DELETE',
                                            body:data._id
                                        }).then((r)=>{
                                            if(r.status == 200){
                                                return r.json();
                                            } else {
                                                //서버가 에러코드 전송시 실행할 코드. ex)500
                                            }
                                        }).then((result) => {
                                            //성공시 실행할 코드
                                            // e.target.parentElement.style.opacity = 0;
                                            const target = e.target as HTMLSpanElement;
                                            const parent = target.parentElement as HTMLDivElement;
                                            console.log(parent.style.opacity);
                                            parent.style.opacity = "0"
                                            // console.log()
                                            // if(target.parentElement?.style.opacity){
                                            //     target.parentElement.style.opacity = "0";
                                            //     // console.log(target.parentElement.style);
                                            // }
                                        
                                            
                                        }).catch((err) => {
                                            //인터넷 문제로 실패시 실행할 코드? 네트워크 에러
                                            console.log();
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