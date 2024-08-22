import { PiUser } from "react-icons/pi";
import { IoCartOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { RxExit } from "react-icons/rx";
import styleHeader from "./header.module.css"
import { Link } from 'react-router-dom';


function Header({categories, setIsLogged, isLogged}){
    const handleLogout = () => {
        setIsLogged(false);
  
        localStorage.removeItem('accessToken');
    }

    return(
        <header>
            <img src="/img/shopping-online.jpg" alt="#" className={styleHeader.logo}/>

            <nav>
                <Link to="/">Shop</Link>
                {categories.map((e, i)=>(
                    <Link 
                        key={i} 
                        to={`/${e.link}`}
                    >
                        {e.name}
                    </Link>
                ))}
            </nav>

            <div className={styleHeader.search}>
                <input type="text" placeholder="Search" className={styleHeader.search__input}/>
                <IoIosSearch className={styleHeader.search__icon}/>
            </div>

            <div className={styleHeader.btns}>

                {
                    isLogged ?
                    <>
                        <Link to="/cart">
                            <IoCartOutline className={styleHeader.icon}/>
                        </Link>
                        <Link to="/">
                            <RxExit className={styleHeader.icon} onClick={handleLogout} />
                        </Link>
                    </>   
                    :
                    <>
                        <Link to="/auth">
                            <PiUser className={styleHeader.icon}/>
                        </Link>
                        <Link to="/cart">
                            <IoCartOutline className={styleHeader.icon}/>
                        </Link>
                    </>
                }
            </div>
            
        </header>
    )

}

export default Header