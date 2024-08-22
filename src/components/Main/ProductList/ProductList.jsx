import { FaStar } from "react-icons/fa";
import styleProductList from "./productList.module.css";


function ProductList({products}) {

    const handleAddToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingProduct = cart.find(item => item.id === product.id);

        if (!existingProduct) {
            cart.push({ ...product, quantity: 1 });
            localStorage.setItem('cart', JSON.stringify(cart));
            alert("Product added to cart!");
        } else {
            alert("Product is already in the cart!");
        }
    };

    return (
        <>
            <div className={styleProductList.colection}>
                {products.map((prod, index)=>(
                    <div key={prod.id} className={styleProductList.product}>
                        <img src={prod.image} alt="#"  className={styleProductList.carts__image}/>
                        <h1 data-full-text={prod.title}>{prod.title}</h1>
                        <p>{prod.description}</p>
                        <div className={styleProductList.product__item}>
                            <span>{prod.price} $</span>
                            <span>{prod.rating.rate}</span>
                            <FaStar className={styleProductList.product__star}/>
                        </div>
                        <button className={styleProductList.product__btn} onClick={() => handleAddToCart(prod)}>Buy</button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ProductList;