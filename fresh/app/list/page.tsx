export default function List (){
    let 상품 = ['Tomatoes', 'Pasta', 'Coconut']
    let array = [2,3,4]
    let b = array.map((data, i) => {
        console.log(data)
        console.log(i)

        return 10
    })

    console.log(array)
    console.log(b)

    return(
        <div>
            <h4 className={"title"}>상품목록</h4>
            {
                상품.map((data, index) => {
                    return (
                        <div className="food" key={index}>
                            <img src={`/food${index}.png`} alt={data} className={"food-img"}></img>
                            <h4>{data} $40</h4>
                        </div>
                        )
                })
            }
        </div>
    )
}