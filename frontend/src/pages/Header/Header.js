import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AuthService from '../../services/AuthService';
import avatar from '../../assets/avatar.png';

import './Header.css';


function Header(props) {
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        let logged = AuthService.getLoggedUser();
        console.log(logged);
        if (!logged) navigate("/login");
        else setUser(logged);
    }, []);

    function logout() {
        AuthService.cleanLoggedUser()
        window.location.reload()
    }

    return (
        <>
            <nav className='Header'>
                <Link to="/create">
                    <button >Criar Post</button>
                </Link>
                <div className='Profile'>
                    <img alt='Avatar' src={avatar}></img>
                    <span>{user?.user?.name}</span>
                    <Link to="/login" onClick={logout}>
                        <button className='Logout'>Logout</button>
                    </Link>
                </div>
            </nav>

        </>
    );
}

export default Header;