import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {getTitleRecipe} from '../actions';

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
        <div>
            <input
            onChange={(e)=> handleInputChange(e)}
            value={name}
            type="text"
            placeholder= "Buscar..."
            />

            <button
                onClick={(e)=>
                handleSubmit(e)}
                type="submit"
            >
            Buscar
            </button>
        </div>
    )
}