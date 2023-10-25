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
                                    <button className="list-btn" onClick={(e) => {
                                        fetch('/api/delete',{
                                            method:'DELETE', body:data._id
                                        }).then((r) => {
                                            if(r.ok){
                                                const target = e.target as HTMLSpanElement;
                                                const parent = target.parentElement as HTMLDivElement;
                                                parent.style.opacity = '0';
                                                setTimeout(() => {
                                                    parent.style.display = 'none';
                                                },1000)
                                            } else {
                                                console.log("실패")
                                            }
                                        }).catch((err) => {
                                                //인터넷 문제로 실패시 실행할 코드? 네트워크 에러
                                                console.log();
                                        })
                                    }}>🗑️</button>

                                    {/*
                                        //쿼리 스트링 문법
                                        fetch('/api/delete?id=' + data._id)
                                            .then((r)=>{
                                                if(r.status == 200){
                                                    return r.json();
                                                }
                                            }).then((result) => {
                                                const target = e.target as HTMLSpanElement;
                                                const parent = target.parentElement as HTMLDivElement;
                                                parent.style.opacity = '0';
                                                setTimeout(() => {
                                                    parent.style.display = 'none';
                                                },1000)
                                            }).catch((err) => {
                                                console.log(err);
                                        }) */}


                                       {/* //URL 파라미터 문법
                                       // fetch('/api/abc/fuck') */}
                                    {/* }}>🗑</span> */}
                                </div>
                        </div>
                    )
                })
            }
        </div>
    )
}