import {NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";

export async function middleware(request:any){
    // console.log(request.nextUrl);   //유저가 현재 요청중인 URL
    // console.log(request.cookies);   //유저가 보낸 쿠키
    // console.log(request.headers);   //유저의 headers 정보
    //
    // NextResponse.next();    //통과
    // NextResponse.redirect();    //다른페이지로 강제이동(브라우저 주소창 변경됨)
    // NextResponse.rewrite(); //다른페이지로 강제이동(브라우저 주소창 변경안됨)

    const session = await getToken({req:request})
    // console.log(session)

    if(request.nextUrl.pathname.startsWith('/write')){
        if(session == null){
            return NextResponse.redirect('http://localhost:3000/api/auth/signin', request.url);
        }
    }

    if(request.nextUrl.pathname.startsWith('/list')){
        console.log(new Date());
        console.log(request.headers.get('sec-ch-ua-platform'));
        return NextResponse.next();
    }

    request.cookies.get('쿠키이름')  //출력
    request.cookies.has('쿠키이름')  //존재확인
    request.cookies.delete('쿠키이름')  //삭제

    const response = NextResponse.next()
    response.cookies.set({
        name: 'mode',
        value: 'dark',
        maxAge: 3600,
        httpOnly : true //자바스크립트로 쿠키조작 방지가능
    })
    return response  //쿠키생성


}