import React, { useState } from 'react';
import avatar from '../../assets/avatar.png';
import comments from '../../assets/comments.png';
import like from '../../assets/like.png';
import liked from '../../assets/liked.png';

import './Post.css';


function Post(props) {

    return (
        <div className='Post'>
            <div className='IconText'>
                <img alt='Avatar' src={avatar}></img>
                <span>{props.post.author}</span>
            </div>
            <h1>{props.post.title}</h1>
            <p>{props.post.description}</p>
            <img className='Photo' alt='Foto' src={props.post.imgUrl}></img>
            <div className='Actions'>
                <div className='IconText'>
                    <img alt='Comentários' src={comments} ></img>
                    <span>Comentar</span>
                </div>
                <div className='IconText'>
                    <img alt='Like' src={props.post.liked ? liked : like} ></img>
                    <span>{props.post.likes}</span>
                </div>
            </div>
        </div>
    );
}

export default Post;