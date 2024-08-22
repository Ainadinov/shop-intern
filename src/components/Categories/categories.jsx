import { useCallback, useEffect, useState } from "react";
import styleCatigories from "./categories.module.css";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import Header from "../Header/header";

function Categories({categories, url, setIsLogged, isLogged}) {
    const [singleCategory, setSingleCategory] = useState([])

    const fetchSingleProduct = useCallback(() => {
        axios.get(`https://fakestoreapi.com/products/category/${url}`, {
            headers: {
                'Accept': 'application/json',
            }
        })
        .then(function (response) {
            setSingleCategory(response.data)
        })
        .catch(function (error) {
            // handle error
        });
    }, []);

    
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

    

    useEffect(()=>{
        fetchSingleProduct()
    },[])

    return (
        <>
            <Header categories={categories} setIsLogged={setIsLogged} isLogged={isLogged}/>
            <h2 className={styleCatigories.title}>{url}</h2>
            
            <div className={styleCatigories.colection}>

                {singleCategory.map((prod, index)=>(
                    <div key={prod.id} className={styleCatigories.product}>
                        <img src={prod.image} alt="#"  className={styleCatigories.carts__image}/>
                        <h6 data-full-text={prod.title}>{prod.title}</h6>
                        <p>{prod.description}</p>
                        <div className={styleCatigories.product__item}>
                            <span>{prod.price} $</span>
                            <span>{prod.rating.rate}</span>
                            <FaStar className={styleCatigories.product__star}/>
                        </div>
                        <button className={styleCatigories.product__btn} onClick={() => handleAddToCart(prod)}>Buy</button>
                    </div>
                ))}

            </div>
        </>
    );
}

export default Categories;