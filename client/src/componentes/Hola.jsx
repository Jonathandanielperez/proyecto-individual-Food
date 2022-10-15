import React from "react"
import {Link} from 'react-router-dom'
//import {jon, css, html, react, js, node, express, psql} from './img'
import css from './img/css.png'
import html from './img/html.png'
import express from './img/express.png'
import node from './img/node.png'
import psql from './img/psql.png'
import react from './img/react.png'
import js from './img/js.png'
import jon from './img/jonCv.JPG'


import '../estilos/hola.css'

export default function Hola(){
    return(
        <div>
  <h1 className="hs">
    Acerca de mi
</h1> 
<hr/>
<h3 className="hs">¿Quien soy?</h3> <br/>
<img src={jon} alt="img" className="imgHola"/>
<span>
    <p>
        Mi nombre es Jonathan Perez, soy desarrollador web full stack graduado del bootcamp Soy Henry.
        Soy una persona muy curiosa y con muchas ganas de seguir aprendiendo, por eso me encuentro estudiando
        la carrera de analista de sistemas en el instituto Bernardo Houssay de Quilmes, Buenos aires,
        localidad en donde resido.

    </p>
</span>
<h3 className="hs">¿Que tecnologias manejo?</h3>
<div>
 <ul className="ulH">
    <li><img src={js}/></li>
    <li><img src={node}/></li>
    <li><img src={html}/></li>
    <li><img src={css}/></li>
    <li><img src={react}/></li>
    <li><img src={express}/></li>
    <li><img src={psql}/></li>
 </ul>
</div>
<Link to='/home'>
<button className='button4'>
    Volver
</button>
</Link>
</div>
    )
}


