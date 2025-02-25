import React, {  useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "../pages/home/Slider";
// import Deal from "../pages/home/Deal";
// import Apparel from "../pages/home/Apparel";
// import Electronics from "../pages/home/Electronics";
import Request from "../pages/home/Request";
import RecommendedProduct from "../pages/home/RecommendedProduct";
import Brands from "../pages/home/Brands";
// import Region from "../pages/home/Region";
import Subscribe from "../pages/home/Subscribe";
import ProductByCategory from "../pages/home/ProductByCategory";
import Menu from "../pages/home/Menu";

function Home(props) {
  const navigate = useNavigate();
  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    if(!authToken) {
      navigate('/login')
    }
  })
  return (
    <>
      <Menu />
      <div className="container">
        <Slider />
        <RecommendedProduct />
        <ProductByCategory />
        {/* <Deal /> */}
        {/* <Apparel /> */}
        {/* <Electronics /> */}
        <Brands />
        <Request />
        {/* <Region /> */}
      </div>
      <Subscribe />
    </>
  );
}

export default Home;
