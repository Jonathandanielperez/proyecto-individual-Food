import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {getTitleRecipe} from '../actions';
import '../estilos/search.css'

export default function Search(){
    const dispatch= useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(getTitleRecipe(name))
        setName("")
    }

    return (
        <div className=''>
            <input
            className='searchTerm'
            onChange={(e)=> handleInputChange(e)}
            value={name}
            type="text"
            placeholder= "Buscar..."
            />

            <button
                className='searchButton'
                onClick={(e)=>
                handleSubmit(e)}
                type="submit"
            >
            Buscar
            </button>
            
        </div>
    )
}