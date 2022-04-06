import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PlantinhaAPI from '../../services/PlantinhaApi';

import './Login.css';
import logo from '../../assets/logo.png';
import AuthService from '../../services/AuthService';


function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    async function login(e) {
        e.preventDefault();
        let user = { email, password };
        console.log(user);
        let result = await PlantinhaAPI.login(user);
        console.log(result);
        if (result.error) {
            setLoginError('Email ou senha incorretos.')
        } else {
            setLoginError('');
            AuthService.setLoggedUser(result);
            navigate('/');
        }
    }

    return (

        <div className={'Modal'}>
            <div className='Content'>
                <div className='Form'>
                    <img className='logo' alt='Logo' src={logo}></img>
                    <label >Email</label>
                    <input value={email} onChange={e => setEmail(e.target.value)}></input>
                    <label >Senha</label>
                    <input value={password} onChange={e => setPassword(e.target.value)} type='password'></input>

                    <span style={{ color: "red" }}>{loginError}</span>

                </div>
                <div className='ActionButtons'>
                    <button onClick={login}>Login</button>
                </div>
                <span>Ainda não possui uma conta?</span>
                <Link to={'/singup'}>
                    <p>Cadastrar</p>
                </Link>
            </div>
        </div>
    );
}

export default Login;