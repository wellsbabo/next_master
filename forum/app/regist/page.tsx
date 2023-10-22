export default function Regist(){
    return (
        <div className="p-20">
            <h4>회원가입</h4>
            <form action="/api/regist" method="POST">
                아이디: <input name="id" placeholder="아이디"></input>
                비밀번호: <input name="password" placeholder="비밀번호"></input>
                <button type="submit">가입</button>
            </form>
        </div>
    )
}