// @ts-ignore
import {age, name} from './data.tsx'
import Hello from './hello'

export default function Cart() {

    let 장바구니 = ['Tomatoes', 'Pasta']

    return (
        <div>
            <h4 className="title">Cart</h4>
            <Hello/>
            <CartItem item={장바구니[0]}/>
            <CartItem item={장바구니[1]}/>
            <Btn color={"red"}/>
            <Btn color={"blue"}/>
        </div>
    )
}

// 컴포넌트
function CartItem(props : any){
    return(
        <div className="cart-item">
            <p>상품명 {props.item} {age}</p>
            <p>$40 {name}</p>
            <p>1개</p>
        </div>
    )
}

function Btn(props : any){
    return <button style={{background: props.color}}>버튼</button>
}