import React from 'react';
import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";
import { Provider } from 'react-redux';
import { Products } from '../pages/Products/index';
import { Header } from '../components/Header/index';
import { Login } from '../pages/Login/index';
import { Home } from '../pages/Home/index';
import { Cart } from '../pages/Cart/index';
import store from '../redux/app/store';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};
