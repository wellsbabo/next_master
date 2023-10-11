// @ts-ignore
import {age, name} from './data.tsx'
import Hello from './hello'

export default function Cart() {
    return (
        <div>
            <h4 className="title">Cart</h4>
            <Hello/>
            <CartItem/>
            <CartItem/>
            <CartItem/>
            <CartItem/>
        </div>
    )
}

// 컴포넌트
function CartItem(){
    return(
        <div className="cart-item">
            <p>상품명 {age}</p>
            <p>$40 {name}</p>
            <p>1개</p>
        </div>
    )
}