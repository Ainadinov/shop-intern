import axios from "axios";
import styleSignIn from "./signin.module.css"
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";



const saveTokenToLocalStorage = (token) => {
    localStorage.setItem('accessToken', token);
};

function AuthSignIn ({setIsLogged}){
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const loginUser = () =>{
        axios.post('https://fakestoreapi.com/auth/login', {
            username: login,
            password: password,
        },{
            headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }})
        .then(response => {
            console.log(response)
            saveTokenToLocalStorage(response.data.token);
            navigate('/');
            setIsLogged(true)
        })
        .catch(error => {
            setError(true)
        })
    }

    return(
        <div className={styleSignIn.sign__container}>
            <div className={styleSignIn.sign__header}>
                <Link to="/">
                    <img src="/img/shopping-online.jpg" alt="#" className={styleSignIn.logo}/>
                </Link>
                <div className={styleSignIn.btns}>
                    <button className={styleSignIn.btns__login}>Login</button>
                    <button className={styleSignIn.btns__signup}>Sign Up</button>
                </div>
                
            </div>

            <img src="/img/sign.png" alt="#" className={styleSignIn.image}/>

            <div className={styleSignIn.auth}>
                <h2>Sign In Page</h2>
                <div className={error ? styleSignIn.error_visible : styleSignIn.error_hidden}>
                    Incorrect username or password.
                </div>
                <span>User name </span>
                <input 
                    type="text" 
                    onChange={(e)=> {
                        setLogin(e.target.value);
                        setError(false);
                    }}
                    required
                    />
                <span>Password</span>
                <input 
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e)=> {
                        setPassword(e.target.value); 
                        setError(false);
                    }}
                    className={styleSignIn.input__password}
                    required
                    />
                <span 
                    onClick={togglePasswordVisibility}
                    className={styleSignIn.eyes__slash}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                 </span>
                <button className={styleSignIn.btns__login} onClick={loginUser}>Sign In</button>
            </div>

        </div>
    )
}

export default AuthSignIn;