import React from 'react';
import { Link } from 'react-router-dom';
import './CartItemCart.css';

function CartItemCart({item,deleteItems}) {
  console.log(item);
  //console.log(deleteItems);

  return (
    <>
        <div className="CartItemCard">
        <img src={item.image} alt="product_image"/>

        <div>
            <Link to={`/product/${item.product}`}>{item.name}</Link>
            <span>{`Price : Rs.${item.price}`}</span>
            <p onClick={()=>deleteItems(item.product)}>Remove</p>
        </div>

        </div>
    </>
  )
}

export default CartItemCart