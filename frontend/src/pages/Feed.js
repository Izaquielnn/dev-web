import React, { useState } from 'react';
import Post from './Post';

import './Feed.css';


function Feed(props) {

    const [posts, setPosts] = useState([
        {
            id: "1",
            title: 'Socorrrooo!',
            description: 'Gente, essa semana meu tomateiro começou a ficar assim. O que pode ser?',
            imgUrl: 'https://www.agrolink.com.br/upload/problemas/Septoria_lycopersici51.jpg',
            author: 'Aninha',
            likes: 6,
            liked: true
        },
        {
            id: "2",
            title: 'Celolinha - segunda semana',
            description: 'Adubei apenas com casca de ovo e banana, vejam como cresceram minhas cebolinhas <3',
            imgUrl: 'https://i.pinimg.com/originals/4b/54/a8/4b54a8b3e422bc5f4af7dcc7a852d644.jpg',
            author: 'Pedrito',
            likes: 26,
            liked: false
        }
    ]);

    return (
        <ul className='Feed'>
            {posts.map(post => <Post key={post.id} post={post} />)}
        </ul>
    );
}

export default Feed;