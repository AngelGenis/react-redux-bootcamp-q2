import React, { useState } from 'react';
import { Input } from '../../components/Inputs';
import { Container, CardLogin, LoginText, Error } from './styles';
import { MainButton } from '../../components/Buttons';
import { CircularProgress } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';

export const Login = () => {
    const { login, errors, clearErrors, isLoading } = useAuth();
    const [error, setError] = useState(null);
    const [data, setData] = useState({
        email: '',
        password: ''
    })


    const handlerChange = (value, name) => {
        setError(null);
        clearErrors();
        setData({ ...data, [name]: value.target.value })
    }

    const handleSubmit = () => {
        setError(null);
        clearErrors();
        if (data.email === '' || data.password === '') {
            setError("No puede haber campos vacios");

        } else {
            login(data.email, data.password);
        }
    }


    return (
        <Container>
            <LoginText style={{ fontSize: 30, marginBottom: 40 }}>Welcome to the WizeStore!</LoginText>

            <CardLogin>
                <LoginText>LOGIN</LoginText>
                <Input
                    titulo="Email"
                    placeholder="correo@gmail.com"
                    onChange={(value) => { handlerChange(value, "email") }}
                    type="email"
                />
                <Error>{errors?.email}</Error>
                <Input
                    titulo="Password"
                    type="password"
                    placeholder="**************"
                    onChange={(value) => { handlerChange(value, "password") }}
                />
                <Error>{errors?.password}</Error>
                {error && (
                    <Error>{error}</Error>
                )}
                {
                    isLoading ?
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <CircularProgress />
                        </div> : <MainButton onClick={handleSubmit}>LOGIN</MainButton>
                }
            </CardLogin>
        </Container>
    )
}