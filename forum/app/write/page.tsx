export default function Write(){
    return(
        <div className="p-20">
            <h4>글작성</h4>
            <form action="/api/test" method="POST">
                제목: <input name="title" placeholder="제목"></input><br/>
                내용: <input name="content" placeholder="내용"></input><br/>
                <button type="submit">등록</button>
            </form>
        </div>
    )
}