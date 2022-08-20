import React from 'react';
import {Link} from 'react-router-dom';


export default function LandingPage(){
    return(
        <div>
            <h1>Pagina web de recetas</h1>
            <Link to= '/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}