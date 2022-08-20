import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getRecipes, getDiets, orderByTitle, orderByHealt, filterDiets, filterCreated} from '../actions';
import {Link} from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import Search from './Search';


export default function Home (){

    const dispatch= useDispatch();
    const allRecipes= useSelector((state) => state.recipes)
    const allDiets= useSelector((state) => state.diets)
    console.log("las diets: ", allDiets)
    const [orden, setOrden]= useState('')
    //paginado
    const [currentPage, setCurrentPage]= useState(1)
    const [recipePerPage, setRecipePerPage]= useState(9)
    const indiceDelUltimo = currentPage * recipePerPage
    const indiceDelPrimero = indiceDelUltimo - recipePerPage
    const currentRecipes = allRecipes.slice(indiceDelPrimero, indiceDelUltimo)
    const paginado= (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getDiets());
        dispatch(getRecipes());
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes());
        setOrden(e.target.value);
    };

    function handleFilterCreated(e){
        e.preventDefault(e);
        dispatch(filterCreated(e.target.value));
        setOrden(e.target.value);
    }

    function handleFilterByDiet(e){
        e.preventDefault(e);
        dispatch(filterDiets(e.target.value))
        setOrden(e.target.value);
    };

    function handleSortTitle(e){
        e.preventDefault();
        dispatch(orderByTitle(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    };

    function handleSortHealt(e){
        e.preventDefault();
        dispatch(orderByHealt(e.target.value))
        setOrden(`Ordenado ${e.target.value}`)
    };


    return(
        <div>
            <div>
                <select onChange={(e)=> handleFilterCreated(e)}>
                    <option value="">Creada/Existente</option>
                    <option value="all">Todas</option>
                    <option value="created">Receta agregada</option>
                    <option value="api">Receta existente</option>
                </select>
            </div>
            <div>
                <select onChange={(e)=>handleFilterByDiet(e)}>
                <option value="">Dietas</option>
                <option value="all">Todas</option>
                {allDiets && allDiets.map((d)=>(
                    <option key={d.id} value={d.name}>{d.name}</option>
                ))}
                </select>
            </div>
            <div>
                <select onChange={e=>handleSortHealt(e)}>
                <option value="">Healt score</option>
                <option value="men">Menor score</option>
                <option value="may">Mayor score</option>
                </select>
            </div>
            <div>
                <select onChange={(e) => handleSortTitle(e)}>
                <option value="">Orden alfabetico</option>
                <option value="asc">A-Z</option>
                <option value="des">Z-A</option>
                </select>
            </div>
            <div>
                <button
                onClick={e =>{handleClick(e)}}
                >
                    <span>Recargar</span>
                </button>
            </div>
            <div>
                <Link to='/'>
                <button>
                    <span>Salir</span>
                </button>
                </Link>
            </div>
            <Link to='/recipes'>
            <button>
                <span>Crear receta</span>
            </button>
            </Link>
            <div>
                <Paginado
                recipePerPage={recipePerPage}
                allRecipes={allRecipes.length}
                paginado={paginado}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                />
            </div>
            <Search/>
            <div>
                {
                    currentRecipes.map(e=>{
                        return(
                            <Card title={e.title} image={e.image} diet={!e.creadoEnDb ? e.diet : e.diets.map(e=>e.name).toString().split(", ")} healthScore={e.healthScore} id={e.id} key={e.id}/>
                        )
                    })
                }
            </div>
        </div>
    )
}