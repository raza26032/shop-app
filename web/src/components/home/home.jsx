import { useState, useEffect } from "react";
import axios from "axios"

function Home() {
  const [products, setproducts] = useState([])

  const [carts, setcarts] = useState([])
  console.log(carts)
  function addcart(product) {
    var result = carts.find((carts) => carts._id === product._id);

    if (result === undefined) {
      setcarts([...carts, product])
    } else {
      alert("Product has Already Added")
    }
  }
  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:5000/getProducts',
      withCredentials: true
    }).then((response) => {
      // console.log(response.data.data)
      setproducts(response.data.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <div style={{ width: "100%" }}>
      <img class="alignnone wp-image-13549 size-full" src="https://rehmateshereen.com/wp-content/uploads/2020/01/banner-Rshree-Hyderabadi-coffee-cake.jpg" alt="" width="1348" height="585" />

      <hr />
      <div className="card1" style={{ width: "100%" }}>
        {products.map((product, index) => (
          <div className="eachproduct" key={index}>
            <img className="pic" src={product.image} alt={product.name} />
            <h1>{product.name}</h1>
            <br />
            <div className="price">PKR: <b>{product.price}</b>/- Per kg</div>
            <div>
              <br />
              <button onClick={() => addcart(product)} >Add To Cart</button>
            </div>
          </div>
        ))}
        {/* <div>
          {carts.map((value, index) => (
            <div className="cart" key={index} style="">
              <img className="pic" src={value.image} />
              <h1>{value.title}</h1>
              <p className="price">PKR: {value.price}/- Per kg</p>
              <div>
                <button style={{ color: "red" }}>Cart Added</button>
              </div>
            </div>
          ))}
        </div> */}
      </div>
      <hr />
      <br />
      <div className="footer">
        <p className="textcopy">Copyright © 2021 All Rights Reserved by <b>AR Solutions</b>.</p>
      </div>
    </div>
  )
}
export default Home