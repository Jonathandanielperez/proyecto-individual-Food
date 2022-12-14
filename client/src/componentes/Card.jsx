import React from 'react';
import {Link} from 'react-router-dom';
import '../estilos/card.css';

export default function Card({id, title, image, diet, healthScore, origen}){
    return (
        <div key={id} className="card">
            <img src={image} alt="imagen de receta" className='img'/>
            <h3 className='hh'>Titulo: {title}</h3>
            <h5 className='hh'>Puntaje de salud: {healthScore}</h5>
            <h5 className='hh'>Dietas: {diet}</h5>
            <h5 className='hh'>Origen: {origen}</h5>
            <Link to={`/detail/${id}`}>
            <button className='button2'>Detalles...</button>
            </Link>
        </div>
    )
}