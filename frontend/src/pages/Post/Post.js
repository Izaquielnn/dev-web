import React, { useState } from 'react';
import avatar from '../../assets/avatar.png';
import comments from '../../assets/comments.png';
import like from '../../assets/like.png';
import liked from '../../assets/liked.png';
import send from '../../assets/send.png';
import PlantinhaApi from '../../services/PlantinhaApi';

import './Post.css';


function Post(props) {
    const [post, setPost] = useState(props.post);

    const [comment, setComment] = useState('');

    async function createComment(e) {
        e.preventDefault();
        if (comment.length > 0) {
            let result = await PlantinhaApi.createComment(comment, post._id);
            if (!result.error) {
                console.log(result);
                setComment('')
                setPost(result);
            }
        }
    }

    return (
        <div className='Post'>
            <div className='IconText'>
                <img alt='Avatar' src={avatar}></img>
                <span>{post.author.name}</span>
            </div>
            <h1>{post.title}</h1>
            <p>{post.description}</p>
            <img className='Photo' alt='Foto' src={post.imgUrl}></img>
            <div className='Actions'>
                <div className='CommentContainer'>
                    <img alt='Comentários' src={comments} ></img>
                    <input className='CommentInput' value={comment} placeholder='Comentar...' onChange={e => setComment(e.target.value)}></input>
                    <button><img alt='Send' src={send} onClick={createComment}></img></button>
                </div>
                <div className='IconText'>
                    <img alt='Like' src={post.liked ? liked : like} ></img>
                    <span>{post.likes}</span>
                </div>
            </div>
            <div className='Comments'>
                {post.comments.map(comm =>
                    <p>
                        <img alt='Avatar' src={avatar}></img>
                        <span>{comm.author.name}:</span>
                        {comm.comment}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Post;