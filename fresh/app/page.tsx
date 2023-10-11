import Link from "next/link"

export default function Home() {

    let name = 'Lee'
    let link = "http://google.com";

  return (
    <div>
        <h4 className="title">NewsLetter Colleague</h4>
        <p className="title-sub">You Become My Colleague</p>
        {/*<a href={link}>링크</a>*/}
    </div>
  )
}
