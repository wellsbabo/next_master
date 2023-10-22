'use client'

// client component에서만 사용 가능. server component에서 쓰고 싶으면
// 이렇게 컴포넌트를 하나 만들고 그걸 가져다가 사용
import { usePathname, useRouter } from "next/navigation"

export default function DetailLink(){
    let router = useRouter();
    
    // console.log(usePathname())
    
    return(
        <button onClick={() => {
            // router.push('/');
            // router.back();
            // router.forward();
        
            router.refresh();   // 바뀐 내용만 새로고침하는 soft refresh
            
            // router.prefetch('/detail/123'); 이 페이지를 방문하는데 필요한 것들을 미리 로드.
            // 해당 페이지를 빠르게 불러올 수 있음. 유용하게 사용할 수 있을듯?
        }}>버튼</button>
    )
}