import React from "react"
import {Link} from 'react-router-dom'

export default function Hola(){
    return(
        <div>
  <h1>
    Acerca de mi
</h1>  
<Link to='/home'>
<button>
    Back
</button>
</Link>
</div>
    )
}


