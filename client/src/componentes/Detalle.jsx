import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail, getClean } from '../actions';
import { useEffect } from 'react';
import '../estilos/detalle.css';


export default function Detalle(props){
    console.log("las props son : ", props)
    const dispatch= useDispatch()

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id));
        dispatch(getClean());
    },[dispatch])
    

    const myReceta= useSelector((state)=>state.detalle)
    console.log("myRecete es : ", myReceta)

    return(

        <div className='div2'>
            <Link to= '/'>
                <button className='button3'><span>Volver</span></button>
            </Link>
            {
            myReceta ?
                <div key={myReceta.id} >
                    <h3 className='h3'>{myReceta.title}</h3>
                    <img className='img2' src={myReceta.image} alt='Imagen de la receta'/>
                    <div className='div22'>
                        <ul className='ul'>
                            <li><h4>Resumen del plato: </h4><p className='p'>{myReceta.summary}</p></li>
                            <li><h4>Puntaje de salud: </h4><p className='p'>{myReceta.healthScore}</p></li>
                            <li><h4>Paso a paso</h4><p className='p'>{myReceta.instructions}</p></li>
                            <li><h4>Dietas: </h4><p className='p'>{
                             !myReceta.creadoEnDb ?
                             myReceta.diet :
                             myReceta.diet.toString().split(', ')
                            }</p></li>
                        </ul>
                    </div>
                </div> :
                <p>Cargando...</p>
            }
            <Link to= '/'>
                <button className='button3'><span>Volver</span></button>
            </Link>
        </div>
    )
}