import React from 'react';
import {Link} from 'react-router-dom';
import '../estilos/landingPage.css';


export default function LandingPage(){
    return(
        <div> 
            <div className='div'>
            <Link to= '/home'> 
                <button className='button1'><span className='button1 span'>Ingresar</span></button>
            </Link>
        </div>
      </div>
    )
}