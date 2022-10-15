import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { postRecipe, getDiets } from '../actions';
import '../estilos/formulario.css';


function validar(input){
    let errors = {};

    if(!input.title || input.title.value===null || input.title.value===""){
        errors.title = "Ingrese el titulo";
    }
    /*else if(/^\s*$/.test(input.title)){
        errors.title = "Titulo: No debe ser vacio";
    }*/
    else if(/^[A-Z][a-z][^$()!¡@#/=¿{}?%&|<>#]*$/.test(input.title)){
        errors.title = "Titulo: Solo se admite texto"
    }
    if(!input.origen || input.origen.length < 3){
        errors.origen = "Origen invalido"
    }
    
    if(!input.summary || input.summary.value===null || input.summary.value===""){
        errors.summary = "Ingrese un resumen";
    }
    /*else if(/^\s*$/.test(input.summary)){
        errors.summary = "Resumen: No debe ser vacio";
    }*/
    /*else if(/^[A-Z][a-z][^$()!¡@#/=¿{}?%&|<>#]*$/.test(input.summary)){
        errors.summary = "Resumen: Solo se admite texto"
    }*/

    if(!input.healthScore || input.healthScore.value===null || input.healthScore.value===""){
        errors.healthScore = "Score: Ingrese numerno de nivel saludable"
    }
    else if(/^\s*$/.test(input.healthScore)){
        errors.healthScore = "Score: No debe ser vacio"
    }
    else if(/(?=.*[0-9])/.test(input.healthScore)){
        errors.healthScore = "Score: Solo se admite numero"
    }

    if(!input.instructions || input.instructions.value===null || input.instructions.value===""){
        errors.instructions = "Ingrese instrucciones";
    }
   
    /*else if(/^[A-Z][a-z][^$()!¡@#/=¿{}?%&|<>#]*$/.test(input.instructions)){
        errors.instructions = "Instrucciones: Solo se admite texto"
    }*/

    if(input.diet.length <= 3){
       errors.diet = "No puede tener mas de 3 dietas"
    }

    return errors
}


export default function Crear(){
    const diet= useSelector((state)=>state.diets)
    const dispatch= useDispatch()
    const history= useHistory()
    const [errors, setErrors]= useState({});
    const [input, setInput]= useState({
        title: "",
        origen:"",
        summary: "",
        healthScore: "",
        instructions: "",
        image: "",
        diet: []
    });

    function handleSubmit(e){
        e.preventDefault();
        if(
            input.title !== "" &&
            input.origen !== "" &&
            input.summary !== "" &&
            input.healthScore !== "" &&
            input.instructions !== "" &&
            input.diet.length !== 0
        ){
            dispatch(postRecipe(input));
            alert("Receta creada!");
            setInput({
                title: "",
                origen: "",
                summary: "",
                healthScore: "",
                instructions: "",
                image: "",
                diet: []
            })
            history.push('/home')
        }else{
            alert("Faltan campos por llenar")
        }
    }

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(
                validar({
                ...input,
                [e.target.name]: e.target.name,
            })
        );
    }

    function handleSelect(e){
        if (input.diet.length === 3){
            alert("Solo se admiten 3 dietas")
        }
        else if(input.diet.includes(e.target.value)){
            alert("No se puede repetir la dieta")
        }
        else if(input.diet.length < 3){
            setInput({
                ...input,
                diet:[...input.diet,e.target.value],
            })
        }
    }

    function handleDelete(e){
        setInput({
            ...input,
            diet: input.diet.filter((el)=>el !==e),
        });
    }

    useEffect(()=>{
        dispatch(getDiets());
    },[dispatch]);

    return(
<div className='div3'>
 <Link to='/home'>
 <button className='button4'>Volver</button>
 </Link>
 <h1 className='h1a'>Crear una receta</h1>
 <form onSubmit={(el) => handleSubmit(el)}>
    <div>
        <label className='lavel'>Titulo: </label>
        <input
            value={input.title}
            type="text"
            name="title"
            id="title"
            required
            onChange={(e)=>handleChange(e)}
            className="inputTerm"
        />
        {/*errors.title && (<p>{errors.title}</p>)*/}
    </div>
    <div>
        <label className='lavel'>Resumen del plato: </label>
        <input 
            value={input.summary}
            type="text"
            name="summary"
            id="summary"
            required
            onChange={(e)=>handleChange(e)}
            className="inputTerm"
        />
        {/*errors.summary && (<p>{errors.summary}</p>)*/}
    </div>
    <div>
        <label className='lavel'>Puntaje de salud: </label>
        <input
            value={input.healthScore}
            type="number"
            name="healthScore"
            id="healthScore"
            min="1"
            max="100"
            required
            onChange={(e)=>handleChange(e)}
            className="inputTerm"
        />
        {/*errors.healthScore && (<p>{errors.healthScore}</p>)*/}
    </div>
    <div>
        <label className='lavel'>Paso a paso: </label>
        <input
            value={input.instructions}
            type="text"
            name="instructions"
            id="instructions"
            required
            onChange={(e)=>handleChange(e)}
            className="inputTerm"
        />
        {/*errors.instructions && (<p>{errors.instructions}</p>)*/}
    </div>
    <div>
        <label className='lavel'>Imagen: </label>
        <input
            value={input.image}
            type="text"
            name="image"
            id="image"
            onChange={(e)=>handleChange(e)}
            className="inputTerm"
        />
    </div>
    <div>
        <label>Origen: </label>
        <input
            value={input.origen}
            type="text"
            name="origen"
            onChange={(e)=>handleChange(e)}
            className="inputTerm"
        />
    </div>
    <div className='liss'>
        <select className="select-css2" onChange={(e)=>handleSelect(e)}>
            <option value="">Elige dietas</option>
            {
                diet.map((d)=>(
                    <option className="select-css2 option" value={d.name} key={d.id}>{d.name}</option>
                ))
            }
        </select>
        <ul className='ul'>
            <li>
                {input.diet.map((e)=>(
                    <button
                        className="select-css2 option"
                        key={e}
                        onClick={()=>handleDelete(e)}
                    >
                        {e}
                        
                    </button>
                ))}
            </li>
        </ul>
    </div>
    <button className="button4" type="submit">Agregar</button>
 </form>
 <div>
 {errors.title && (<p className='danger'>{errors.title}</p>)}
 {errors.summary && (<p className='danger'>{errors.summary}</p>)}
 {errors.healthScore && (<p className='danger'>{errors.healthScore}</p>)}
 {errors.instructions && (<p className='danger'>{errors.instructions}</p>)}
 {errors.origen && (<p className='danger'>{errors.origen}</p>)}
 </div>

</div>
)}