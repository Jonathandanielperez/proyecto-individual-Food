import React from 'react';
import {Link} from 'react-router-dom';

export default function Card({id, title, image, diet, healthScore}){
    return (
        <div key={id}>
            <img src={image} alt="imagen de receta"/>
            <h3>Titulo: {title}</h3>
            <h5>Healt score: {healthScore}</h5>
            <h5>Dietas: {diet}</h5>
            <Link to={`/detalle/${id}`}>
            <button>Detalles...</button>
            </Link>
        </div>
    )
}