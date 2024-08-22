import { FaTrashCan } from "react-icons/fa6";
import styleCart from "./cart.module.css"
import Header from "../Header/header";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'


function Cart ({categories}){
    const [cartItems, setCartItems] = useState([]);
    const [subTotal, setSubTotal] = useState(0)

    useEffect(() => {
        const savedCartItems = JSON.parse(localStorage.getItem('cart')) || [];

        const updatedCartItems = savedCartItems.map(item => ({
            ...item,
            quantity: item.quantity || 1,
        }));
        setCartItems(updatedCartItems);
    }, []);

    useEffect(()=>{
        const updateSubTotal = cartItems.reduce((acc, elem, index) =>{
            return acc += elem.price * elem.quantity
        }, 0)

        setSubTotal(updateSubTotal)
    },[cartItems])

    const handleRemoveCart = (productId) => {
        const updatedCartItems = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    };

    const handleQuantityChange = (productId, amount) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === productId) {
                return { ...item, quantity: item.quantity + amount };
            }
            return item;
        }).filter(item => item.quantity > 0);

        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    };
    return(
        <>
            <Header categories={categories}/>
            {
                cartItems.length === 0 ? 
                    (
                        <div className={styleCart.cart__empty}>
                            <img src="/img/empty.png" alt="#" />
                            <h5>Your cart is empty and sad :(</h5>
                            <p>Add something to make it happy!</p>
                            <Link to="/">Continue Shopping</Link>
                        </div>
                    )
                :
                    (
                        <div className={styleCart.cart__full}>
                            <div className={styleCart.cart__head}>
                                <div>product details</div>
                                <div>price</div>
                                <div>countity</div>
                                <div>subtotal</div>
                                <div>action</div>
                            </div>
                            {cartItems.map((item, i)=>(
                                <div key={item.id} className={styleCart.cart__item}>
                                    <div className={styleCart.cart__info}>
                                        <img src={item.image} alt="#" />
                                        <h2>{item.title}</h2>
                                    </div>
                                    <div>
                                        {item.price}
                                    </div>
                                    <div className={styleCart.quantity}>
                                        <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                                        <span >{item.quantity}</span>
                                        <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                                    </div>
                                    <div>
                                        {(item.quantity * item.price).toFixed(2)}
                                    </div>
                                    <FaTrashCan className={styleCart.cart__trash} onClick={()=> handleRemoveCart(item.id)}/>
                                </div>
                            ))}
                            <div className={styleCart.subtotal}>
                                <span>Sub Total: {(subTotal).toFixed(2)}$</span>
                                <button>Proceed To Checkout</button>
                            </div>
                        </div>
                    )


            }
        </>
    )
}

export default Cart