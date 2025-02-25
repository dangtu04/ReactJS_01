import React from 'react';
import { useRoutes } from 'react-router-dom';
import Home from './Home';
import UserLogin from './UserLogin';
import SectionContent from '../pages/ListingGrid/SectionContent';
import ProductDetail from '../pages/home/ProductDetail';
import Cart from '../pages/home/Cart';
import Payment from '../pages/home/Payment';
import UserRegister from './UserRegister';
import ProductGrid from '../pages/ListingGrid/ProductGrid';
import ProductSearch from '../pages/home/ProductSearch';
import Profile from '../pages/home/Profile';
import SettingProfile from '../pages/home/SettingProfile';
import Order from '../pages/home/Order';

const Main = () => {
  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/home', element: <Home /> },
    { path: '/login', element: <UserLogin/> },
    { path: '/register', element: <UserRegister/> },
    { path: '/ListingGrid', element: <SectionContent />},
    { path: '/ProductDetail/:productId', element: <ProductDetail />},
    { path: '/Cart', element: <Cart />},
    { path: '/Payment', element: <Payment />},
    { path: '/ProductGrid', element: <ProductGrid />},
    { path: '/ProductSearch', element: <ProductSearch />},
    { path: '/Profile', element: <Profile />},
    { path: '/SettingProfile', element: <SettingProfile />},
    { path: '/Order', element: <Order />},

  ]);

  return routes;
}

export default Main;
