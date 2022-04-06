import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PlantinhaAPI from '../../services/PlantinhaApi';

import './SingUp.css';
import logo from '../../assets/logo.png';
import AuthService from '../../services/AuthService';


function SingUp(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const [registerError, setRegisterError] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    async function register(e) {
        e.preventDefault();
        validate();
        if (Object.keys(errors).length === 0) {
            let user = { email, password, name };
            console.log(user);
            let result = await PlantinhaAPI.register(user);
            console.log(result);
            if (result.error) {
                setRegisterError('Email já cadastrado!')
            } else {
                setRegisterError('');
                let logged = await PlantinhaAPI.login(user);
                AuthService.setLoggedUser(logged);
                navigate('/');
            }
        }

    }

    function validate() {
        let err = {}
        if (email.length < 3) {
            err['email'] = 'Email inválido'
        }

        if (password.length < 3) {
            err['password'] = 'Senha muito curta'
        }

        if (name.length < 3) {
            err['name'] = 'Nome muito curto'
        }

        setErrors(err);
    }

    return (

        <div className={'Modal'}>
            <div className='Content'>
                <div className='Form'>
                    <img className='logo' alt='Logo' src={logo}></img>
                    <label >Email</label>
                    <input value={email} onChange={e => { setEmail(e.target.value); validate() }}></input>
                    <span style={{ color: "red" }}>{errors["email"]}</span>
                    <label >Nome</label>
                    <input value={name} onChange={e => { setName(e.target.value);; validate() }}></input>
                    <span style={{ color: "red" }}>{errors["name"]}</span>
                    <label >Senha</label>
                    <input value={password} onChange={e => { setPassword(e.target.value); validate() }} type='password'></input>
                    <span style={{ color: "red" }}>{errors["password"]}</span>

                    <span style={{ color: "red" }}>{registerError}</span>

                </div>
                <div className='ActionButtons'>
                    <button onClick={register}>Cadastrar</button>
                </div>
                <span>Já possui uma conta?</span>
                <Link className='SingUp' to={'/login'}>
                    <p>Login</p>
                </Link>
            </div>
        </div>
    );
}

export default SingUp;