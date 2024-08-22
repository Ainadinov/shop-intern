import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import Main from "./components/Main/Main";
import AuthSignIn from "./components/SignIn/SignIn";
import { useEffect, useMemo, useState } from "react";
import Categories from "./components/Categories/categories";


function App() {
  const categories = useMemo(() => [
    { name: "Men", url: "men's clothing", link: "men" },
    { name: "Women", url: "women's clothing", link: "women" },
    { name: "Electronics", url: "electronics", link: "electronics" },
    { name: "Jewelery", url: "jewelery", link: "jewelery" },
 ], []);

  const [isLogged, setIsLogged] = useState(() => {
    const storedIsLogged = localStorage.getItem('isLogged');
    return storedIsLogged ? JSON.parse(storedIsLogged) : false;
  });

  useEffect(() => {
    localStorage.setItem('isLogged', JSON.stringify(isLogged));
  }, [isLogged]);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main categories={categories} setIsLogged={setIsLogged} isLogged={isLogged}/>}/>
        {categories.map((e,i)=>(
          <Route path={`/${e.link}`} element={<Categories key={i} categories={categories} url={e.url} setIsLogged={setIsLogged} isLogged={isLogged}/>}/>
        ))}
        <Route path="/cart" element={<Cart categories={categories}/>}/>
        <Route path="/auth" element={<AuthSignIn setIsLogged={setIsLogged}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;