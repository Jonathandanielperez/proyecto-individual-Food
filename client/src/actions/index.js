import axios from 'axios';

export function getRecipes(){
    return async function (dispatch){
        var json= await axios.get("http://localhost:3001/recipes");
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
}

export function getDiets(){
    return function (dispatch){
        axios.get('http://localhost:3001/diets').then((diet)=>dispatch({
            type: 'GET_DIETS',
            payload: diet.data
        }));
    };
}

export function getTitleRecipe(name){
    return async function (dispatch){
        try{
            var json = await axios.get("http://localhost:3001/recipes?name=" + name);
            return dispatch ({ type: 'GET_TITLE', payload: json.data});   
        }catch (error){
            console.log("El error: ", error)
            alert("Receta no encontrada")
        }
    }
}

 export function filterDiets(payload){
    return{
        type: 'FILTER_DIETS',
        payload
    }
 }

export function filterCreated(payload){
    return{
        type: 'FILTER_CREATED',
        payload
    }
}

export function orderByTitle(payload){
    return{
        type: 'ORDER_BY_TITLE',
        payload
    }
}

export function orderByHealt(payload){
    return{
        type: 'ORDER_BY_HEALT',
        payload
    }
}

export function getDetail(id){
    return async function (dispatch){
        try{
            var json= await axios.get("http://localhost:3001/recipes/"+id);
            return dispatch ({
                type: 'GET_DETAIL',
                payload: json.data
            })
        }catch (error){
            console.log('El error del id es: ', error)
        }
    }
}

export function postRecipe(payload){
    return async function(dispatch){
        const info= await axios.post('http://localhost:3001/recipes', payload);
        return info;
    }
}

export function getClean(){
    return{
        type: 'GET_CLEAN',
        payload: []
    }
}

