import { CircularProgress } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from '../../hooks/useAuth'
import { didTryAutoLogin, getAuth } from '../../redux/auth'

const AuthGaurd = ({ children }) => {
    const isAuth = useSelector(getAuth);
    const navigate = useNavigate()
    const location = useLocation();
    const { tryLogin } = useAuth();
    const didTry = useSelector(didTryAutoLogin)

    useEffect(() => {
        tryLogin()
    }, []);

    useEffect(() => {
        const protected_routes = ['/products', '/cart'];
        if (protected_routes.includes(location.pathname) && !isAuth && didTry) {
            navigate('/login');
        }
    }, [location, isAuth, navigate]);

    if (!didTry) {
        return (
            <CircularProgress />
        )
    }
    return children
}

export default AuthGaurd