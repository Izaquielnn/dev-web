import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PlantinhaAPI from '../../services/PlantinhaApi';

import './CreatePost.css';


function CreatePostModal(props) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imgUrl, setImgUrl] = useState('');

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    async function createPost(e) {
        e.preventDefault();
        validate();
        if (Object.keys(errors).length === 0) {
            let post = { title, description, imgUrl };
            console.log(post);
            await PlantinhaAPI.createPost(post);
            navigate('/');
        }
    }

    function validate() {
        let err = {}
        if (title.length < 3) {
            err['title'] = 'Título muito curto'
        }

        if (description.length < 3) {
            err['description'] = 'Descrição muito curta'
        }

        if (!/https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imgUrl)) {
            err['imgUrl'] = 'Url inválida'
        }

        setErrors(err);
    }

    return (
        <>
            <div className={'Modal'}>
                <div className='Content'>
                    <Link to="/"><button className='CloseButton'>X</button></Link>
                    <div className='Form'>
                        <label >Título</label>
                        <input className='TitleInput' value={title} onChange={e => { setTitle(e.target.value); validate() }}></input>
                        <span style={{ color: "red" }}>{errors["title"]}</span>
                        <label>Descrição</label>
                        <textarea rows={5} value={description} onChange={e => { setDescription(e.target.value); validate() }}></textarea>
                        <span style={{ color: "red" }}>{errors["description"]}</span>
                        <label>Url da imagem</label>
                        <input value={imgUrl} onChange={e => { setImgUrl(e.target.value); validate() }}></input>
                        <span style={{ color: "red" }}>{errors["imgUrl"]}</span>
                    </div>
                    <div className='ActionButtons'>
                        <button onClick={createPost}>Criar Post</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreatePostModal;