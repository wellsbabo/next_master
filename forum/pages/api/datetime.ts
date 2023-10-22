export default function handler(req:any, res:any){
    const now_date = new Date().toLocaleString('ko-kr');

    console.log(now_date)
    res.status('200').json(now_date);
}