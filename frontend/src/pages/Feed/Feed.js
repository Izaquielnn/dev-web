import React, { useEffect, useState } from 'react';
import Post from '../Post/Post';
import PlantinhaAPI from '../../services/PlantinhaApi';

import './Feed.css';


function Feed(props) {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        PlantinhaAPI.getPosts().then((posts) => {
            setPosts(posts);
            setLoading(false);
        });
    }, []);

    return (
        <>
            {loading ?
                <h2>Carregando...</h2> :
                <ul className='Feed'>
                    {posts.map(post => <li><Post key={post.id} post={post} /></li>)}
                </ul>
            }
        </>
    );
}

export default Feed;