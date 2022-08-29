const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    detalle: []
}

function rootReducer (state = initialState, action){
    switch(action.type){
        case 'GET_RECIPES':
            return{
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        case 'GET_DIETS':
            return{
                ...state,
                diets: action.payload
            }
        case 'FILTER_DIETS':
                const allRecipes2= state.allRecipes;
                const dietsFilter= action.payload === 'all'?
                allRecipes2 :
                allRecipes2.filter(e =>{
                    return !e.creadoEnDb ? e.diet?.includes(action.payload): e.diet?.includes(action.payload);
                })
                return{
                    ...state,
                    recipes: dietsFilter
                }
            //filtro pór db o api
        case 'FILTER_CREATED':
                const allRecipe3= state.allRecipes
                const createdFilter= action.payload === 'created' ?
                allRecipe3.filter(e=>e.creadoEnDb) :
                allRecipe3.filter(e=>!e.creadoEnDb)
                return{
                    ...state,
                    recipes: action.payload === 'all' ? allRecipe3 : createdFilter
                };

            //filtro por orden alfabetico
        case 'ORDER_BY_TITLE':
            let sortedArr = action.payload === 'asc' ?
            state.recipes.sort(function (a,b){
                if(a.title > b.title){
                    return 1;
                }
                if(b.title > a.title){
                    return -1;
                }
                return 0;
            }) :
            state.recipes.sort(function (a,b){
                if(a.title > b.title){
                    return -1;
                }
                if(b.title > a.title){
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                recipes: sortedArr
            }

            //orden por healt score
        case 'ORDER_BY_HEALT':
            let sortHealt= action.payload === 'may' ?
            state.recipes.sort(function(a, b){
                return b.healthScore - a.healthScore;
            }) : 
            state.recipes.sort(function(a, b){
                return a.healthScore - b.healthScore;
            })
            return{
                ...state,
                recipes: sortHealt
            }


            //detalle de la receta
        case 'GET_DETAIL':
            return{
                ...state,
                detalle: action.payload
            }
            //ruta crear
        case 'POST_DOG':
            return{
                ...state,
            }
            //busca por titulo
        case 'GET_TITLE':
            return{
                ...state,
                recipes: action.payload
            }
        //limpia el estado de detalle
        case 'GET_CLEAN':
            return{
                ...state,
                detail: action.payload
            }
        default:
            return state;
    }
}
export default rootReducer;