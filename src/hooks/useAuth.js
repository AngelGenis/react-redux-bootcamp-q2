import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AUTHENTICATE, getAuth, LOGOUT, SET_DID_TRY_AL } from '../redux/auth';
import { useNavigate, useLocation } from 'react-router-dom';

export const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const userId = useSelector(getAuth);
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    let timer;

    const tryLogin = async () => {
        setIsLoading(true);
        const userData = localStorage.getItem('userDataRedux');

        if (!userData) {
            dispatch(SET_DID_TRY_AL());
            setIsLoading(false);
            navigate("/login");
            return;
        }
        const transformedData = JSON.parse(userData);
        const { token, userId, expiryDate } = transformedData;
        const expirationDate = new Date(expiryDate);

        if (expirationDate <= new Date() || !token || !userId) {
            dispatch(SET_DID_TRY_AL());
            setIsLoading(false);
            navigate("/login")
            return
        }

        const expirationTime = expirationDate.getTime() - new Date().getTime()

        dispatch(AUTHENTICATE({ userId, token, expirationTime }));
        setIsLoading(false);
        location.pathname === '/login' && navigate('/products');

    };

    const login = async (email, password) => {
        setIsLoading(true);
        setErrors({ ...errors, email: '', password: '' });
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAnvbSHJRAAY_T2UW8yl4l0st0aDddUy6c',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'aplication/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            });

        if (!response.ok) {
            const errorRestData = await response.json();
            const errorId = errorRestData.error.message;
            let message = '';

            switch (errorId) {
                case 'EMAIL_NOT_FOUND':
                    message = "El correo electronico no se encuentra registrado";
                    setErrors({ ...errors, email: message });
                    break;
                case 'INVALID_PASSWORD':
                    message = "La contraseña es incorrecta";
                    setErrors({ ...errors, password: message });
                    break;
                default:
                    message = 'Ha ocurrido un error, intentelo más tarde';;
                    setErrors({ ...errors, password: message });
                    break;
            }
            setIsLoading(false);
            throw new Error(message);
        }

        const restData = await response.json();
        dispatch(AUTHENTICATE({ userId: restData.localId, token: restData.idToken }));
        setIsLoading(false);
        const expirationDate = new Date(new Date().getTime() + parseInt(restData.expiresIn) * 10000);
        saveDataToStorage(restData.idToken, restData.localId, expirationDate);
        navigate("/products");
    }

    const saveDataToStorage = (idToken, userId, expirationDate) => {
        localStorage.setItem(
            'userDataRedux',
            JSON.stringify({
                token: idToken,
                userId: userId,
                expiryDate: expirationDate.toISOString()
            })
        )
    }

    const clearLogoutTimer = () => {
        if (timer)
            clearTimeout(timer);
    }

    const clearErrors = () => {
        setErrors({ email: '', password: '' });
    }

    const logout = () => {
        clearLogoutTimer();
        localStorage.removeItem('userDataRedux');
        dispatch(LOGOUT());
        navigate("/login");
    }

    const checkIsAuth = () => {
        if (!userId) {
            navigate('/login');
        }
    }

    return {
        login,
        logout,
        tryLogin,
        errors,
        clearErrors,
        isLoading,
        checkIsAuth
    }
}