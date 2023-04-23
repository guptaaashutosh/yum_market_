import React,{ useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from '../../actions/AddToCartAction';
import './Cart.css';
import CartItemCart from './CartItemCart';
import {Typography} from '@material-ui/core';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { useAlert } from 'react-alert';



function Cart() {

    

    const navigate=useNavigate();

    const dispatch=useDispatch();
    const {cartItems}=useSelector((state)=>state.cart);

    //const [quantity, setQuantity] = useState(item.quantity);

    const increaseQuantity=(id,quantity,stock)=>{
       const qty=quantity+1;
       if(stock <= quantity) {
        return
       };
       dispatch(addItemToCart(id,qty));
    }

    const decreaseQuantity=(id,quantity)=>{
        const qty=quantity-1;
        if(1 >= quantity) {
         return
        };
        dispatch(addItemToCart(id,qty));
     }

     const deleteItems=(id)=>{
        //console.log(id);
        dispatch(removeItemFromCart(id))
     }

     const alert = useAlert();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.users
    );


    
 
  
  
    const checkOutHandler=()=>{
        if(isAuthenticated){
        navigate("/shipping");
        }else{
            navigate("/login");
        }
      }
       

  return (
    <>
        {cartItems.length === 0 ? 
        <div className="emptyCart">
            <RemoveShoppingCartIcon/>
            <Typography>No product in your cart</Typography>
            <Link to="/products">View Products</Link>
        </div>
        :(
            <>
        <div className="cartPage">
            <div className="cartHeader">
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
            </div>


            {cartItems && cartItems.map((item)=>(
                
                 <div className="cartContainer" key={item.product}>
                <CartItemCart item={item} deleteItems={deleteItems}/>
                <div className="cartInput">
                    <button onClick={()=>decreaseQuantity(item.product,item.quantity)
                    } >-</button>
                    <input type="number" value={item.quantity} readOnly />
                    <button onClick={()=>increaseQuantity(item.product,item.quantity,item.stock)
                    } >+</button>
                </div>
               <p className="cartSubtotal">
                 {`Rs: ${item.price*item.quantity}`}
               </p>
             </div>

            ))}


            <div className="cartGrossProfit">
                <div></div>
                <div className="cartGrossProfitBox">
                    <p>Gross Total</p>
                    
                    <p>{`Rs:${
                        cartItems.reduce(
                            (acc,item)=> acc + item.price*item.quantity,
                            0
                        )
                    }`}</p>

                </div>
                <div></div>
                <div className="checkOutBtn">
                    <button onClick={checkOutHandler}>Check Out</button>
                </div>
            </div>
        </div>


    </>
        )}
    </>
  )
}

export default Cart;