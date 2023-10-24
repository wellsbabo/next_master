import {connectDB} from "@/util/database";



// 누군가 페이지 방문시 캐싱. 60초동안 캐싱 유지
// fetch 안쓰고 페이지 자체의 캐시를 만들어놓을 때 사용
// export const revalidate = 60; 

export default async function Home() {

  const client = await connectDB;
  const db = client.db("forum");
  let result = await db.collection('post').find().toArray();

  // console.log(result);

  // await fetch('/api/test',{cache: 'force-cache'}) //캐시 있음. 사실 캐시있는게 디폴트라 force-cache 없어도됨
  // await fetch('/api/test',{cache: 'no-store'})  // 캐시 없음. 매번 새거 요청
  // await fetch('/api/test',{next:{revalidate:60}}) //60초마다 캐싱된 데이터 갱신
  
  return (
      <div>{result[0].content}</div>
      // <div>안녕</div>
  )
  
}
