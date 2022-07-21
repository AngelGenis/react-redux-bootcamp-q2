import React, { useEffect, useState } from 'react';
import {
  Bar,
  Links,
  FlexContainer,
  LogoutButton,
  FavoriteButton,
} from '../Header/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useAuth } from '../../hooks/useAuth';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from '../../redux/auth';
import { getTotalItems, getTotalFavoriteItems, setShowFavorites, getShowFavorites } from '../../redux/products';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export const Header = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const userId = useSelector(getAuth);
  const totalItems = useSelector(getTotalItems);
  const totalFavoriteItems = useSelector(getTotalFavoriteItems);
  const showFavorites = useSelector(getShowFavorites);
  const dispatch = useDispatch();

  return (
    <Bar className="topnav" id="myTopnav">
      <Links to="/">
        Wizestore
      </Links>
      <FlexContainer>
        <Links to={userId ? "/products" : "/login"} style={{ fontWeight: 'normal' }}>Products</Links>

        {
          location.pathname === '/products' && (
            <FavoriteButton onClick={() => { dispatch(setShowFavorites(!showFavorites)) }}>
              <div style={{ width: 20, height: 20, background: 'red', position: 'absolute', borderRadius: 500, right: 0, top: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {
                  <p style={{ color: 'white', fontWeight: 'bold', fontFamily: 'Roboto', fontSize: 12 }}>{totalFavoriteItems?.length}</p>
                }
              </div>
              {
                showFavorites ? <FavoriteIcon color="#000" /> : <FavoriteBorderIcon size={25} />
              }
            </FavoriteButton>
          )
        }

        <Links to={userId ? "/cart" : "/login"}>
          <div style={{ width: 20, height: 20, background: 'red', position: 'absolute', borderRadius: 500, right: 0, top: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {
              <p style={{ color: 'white', fontWeight: 'bold', fontFamily: 'Roboto', fontSize: 12 }}>{totalItems}</p>
            }
          </div>
          <ShoppingCartOutlinedIcon color="#000" />
        </Links>
        {
          location.pathname !== '/login' && (
            <LogoutButton onClick={logout}>
              <LogoutIcon color='#000' />
            </LogoutButton>
          )
        }
      </FlexContainer>
    </Bar >
  );
};