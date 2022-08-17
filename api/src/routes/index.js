const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
const {
    API_KEY0, API_KEY1, API_KEY2, API_KEY3, API_KEY4
} = process.env;
const {Recipe, Diet} = require('../db')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//traigo las recetas
const getApiInfo = async ()=>{
    const firstReq = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=8b3b81aa6ed047b08e353cb828d81133&number=100&addRecipeInformation=true`);
    const info = firstReq.data.results.map(e=>{
        return{
            id: e.id,
            title: e.title,
            //summary: e.summary,
            //healthScore: e.healthScore,
            //analyzedInstructions: e.analyzedInstructions.map(f=>f.steps.map(e=>e.step)),
            image: e.image,
            diet: e.diets
        }
    })
    return info;
}



//ruta get x receta

router.get('/recipes', async (req,res)=>{
    const name = req.query.name;
    const lasRecetas = await getAllrecetas();
    if(name){
        let receta2 = lasRecetas.filter(e=>e.title.toLowerCase().includes(name.toLocaleLowerCase()))
        console.log("receta 2", receta2);
        receta2.length ?
        res.status(200).send(receta2) :
        res.status(404).send("La receta no existe");
    } else{
        res.status(200).send(lasRecetas)
    }
})

//junto los de api con los de db
const getAllrecetas = async ()=>{
    const apiInfo = await getApiInfo()
    const dbInfo = await getDbInfo()
    const infoTotal = [...apiInfo, ...dbInfo]
    return infoTotal    
}

//ruta get x id

const getDbInfo = async()=>{
    return await Recipe.findAll({
        include:[{
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }]
    });
}

const getId =async (id)=>{
    try{
        if(typeof id === 'string' && id.length > 6){
            const db = await Recipe.findByPk(id, {include: Diet})
            return{
                id: db.id,
                title: db.title,
                summary: db.summary,
                healthScore: db.healthScore,
                instructions: db.instructions,
                image: db.image,
                creadoEnDb: true
            }
        }
        const recetaA = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=8b3b81aa6ed047b08e353cb828d81133`)
        return{
            id: recetaA.data.id,
            title: recetaA.data.title,
            summary: recetaA.data.summary,
            healthScore: recetaA.data.healthScore,
            instructions: recetaA.data.instructions,
            image: recetaA.data.image,
            diet: recetaA.data.diets
        }
    }catch (error){console.log( 'el error del id es: ', error)}
}

router.get('/recipes/:id', async(req,res)=>{
    const id = req.params.id;
    try{
        if(id){
            let recetaId = await getId(id)
            recetaId ?
            res.status(200).send(recetaId) : 
            res.status(404).send('Receta no encontrada')
        }
    }catch (error){console.log('El error del id es: ', error)}
})

//get x dieta

module.exports = router;
