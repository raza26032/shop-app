import { useState } from "react";

function Home() {
  const [products, setproducts] = useState([
    {
      id: '1',
      title: 'Chocolate Cake',
      price: 1500,
      image: 'https://www.dilpasandsweets.com/wp-content/uploads/2019/07/img23-3.png',
    },
    {
      id: '2',
      title: 'Valentine Cake',
      price: 980,
      image: 'https://www.dilpasandsweets.com/wp-content/uploads/2019/07/img19-3.png',
    },
    {
      id: '3',
      title: 'Chocolate Cake',
      price: 980,
      image: 'https://www.dilpasandsweets.com/wp-content/uploads/2019/07/img16-4.png',
    },
    {
      id: '4',
      title: 'Cricket Cake',
      price: 980,
      image: 'https://www.dilpasandsweets.com/wp-content/uploads/2019/07/img17-4.png',
    },
    {
      id: '5',
      title: 'Chocolate Cake',
      price: 1500,
      image: 'https://www.dilpasandsweets.com/wp-content/uploads/2019/07/img23-3.png',
    },
    {
      id: '6',
      title: 'Valentine Cake',
      price: 980,
      image: 'https://www.dilpasandsweets.com/wp-content/uploads/2019/07/img19-3.png',
    },
    {
      id: '7',
      title: 'Chocolate Cake',
      price: 980,
      image: 'https://www.dilpasandsweets.com/wp-content/uploads/2019/07/img16-4.png',
    },
    {
      id: '8',
      title: 'Cricket Cake',
      price: 980,
      image: 'https://www.dilpasandsweets.com/wp-content/uploads/2019/07/img17-4.png',
    },
  ])

  const [carts, setcarts] = useState([])
  console.log(carts)
  function addcart(product) {
    var result = carts.find((carts) => carts.id === product.id);

    if (result === undefined) {
      setcarts([...carts, product])
    } else {
      alert("Product has Already Added")
    }
  }
  return (
    <div style={{width: "100%"}}>
      <img class="alignnone wp-image-13549 size-full" src="https://rehmateshereen.com/wp-content/uploads/2020/01/banner-Rshree-Hyderabadi-coffee-cake.jpg" alt="" width="1348" height="585" />

      <hr />
      <div className="card1" style={{width: "100%"}}>
        {products.map((product, index) => (
          <div className="eachproduct" key={index}>
            <img className="pic" src={product.image} alt={product.title} />
            <h1>{product.title}</h1>
            <br />
            <div className="price">PKR: {product.price}/- Per kg</div>
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
        <p className="textcopy">Copyright © 2021 All Rights Reserved by <b>Ajx Solutions</b>.</p>
      </div>
    </div>
  )
}
export default Home