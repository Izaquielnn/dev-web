import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Header.css';


function Header(props) {
    return (
        <>
            <nav className='Header'>
                <Link to="/create">
                    <button >Criar Post</button>
                </Link>
            </nav>
        </>
    );
}

export default Header;