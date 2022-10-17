import React from "react"
import { Link } from "react-router-dom"
import  '../estilos/hamburger.css'

export const Hamburger = () =>{
    return(
        <div>
        <input type="checkbox" id="menu" className="in"/>
        <label for="menu" className="labelHam"> ☰ </label>
        <ul className="ulHam">             
 <Link to='/recipes'>
<button className='almenu'>
    <span className="span">Crear receta</span>
</button>
</Link>            
           
            
<div>
    <Link to='/hola'>
    <button className='almenu'>
        <span className="span">Acerca de mi</span>
    </button>
    </Link>
</div>              
            
        </ul>
    </div>
    )
}