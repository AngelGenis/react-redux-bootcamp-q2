import React from 'react';
import {
  Bar,
  Links,
  FlexContainer,
  LogoutButton,
} from '../Header/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useAuth } from '../../hooks/useAuth';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuth } from '../../redux/auth';


export const Header = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const userId = useSelector(getAuth);

  return (
    <Bar className="topnav" id="myTopnav">
      <Links to="/">
        Wizestore
      </Links>
      <FlexContainer>
        <Links to={userId ? "/products" : "/login"} style={{ fontWeight: 'normal' }}>Products</Links>
        <Links to={userId ? "/cart" : "/login"}>
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