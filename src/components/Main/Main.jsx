import { useCallback, useEffect, useState } from "react";
import styleMain from "./main.module.css";
import axios from "axios";
import Header from "../Header/header";
import { Link } from 'react-router-dom';
import ProductList from "./ProductList/ProductList";

// https://fakestoreapi.com/products
function Main({categories, setIsLogged, isLogged}) {
    const [products, setProducts] = useState([])

    const fetchAllProducts = useCallback(() => {
        axios.get(`https://fakestoreapi.com/products`, {
            headers: {
                'Accept': 'application/json',
            }
        })
        .then(function (response) {
            setProducts(response.data)
        })
        .catch(function (error) {
            // handle error
        });
    }, []);

    

    useEffect(()=>{
        fetchAllProducts()
    },[])

    return (
        <>
            <Header categories={categories} setIsLogged={setIsLogged} isLogged={isLogged}/>
            <div className={styleMain.background}>
                <h3>New Collection</h3>
                <h1>Menswear 2024</h1>
                <Link to="/men">
                    Shop Now
                </Link>
            </div>
            <ProductList products={products}/>
        </>
    );
}

export default Main;
