import React from 'react';
import {Link} from 'react-router-dom';
import '../estilos/card.css';

export default function Card({id, title, image, diet, healthScore}){
    return (
        <div key={id} className="card">
            <img src={image} alt="imagen de receta" className='img'/>
            <h3 className='hh'>Titulo: {title}</h3>
            <h5 className='hh'>Healt score: {healthScore}</h5>
            <h5 className='hh'>Dietas: {diet}</h5>
            <Link to={`/detail/${id}`}>
            <button className='button2'>Detalles...</button>
            </Link>
        </div>
    )
}//detail