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
    const firstReq = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=c7455ffa96db4588bd6ae873da636768&number=100&addRecipeInformation=true`);
    const info = firstReq.data.results.map(e=>{
        return{
            origen: "Extranjero",
            id: e.id,
            title: e.title,
            //summary: e.summary,
            healthScore: e.healthScore,
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
                creadoEnDb: true,
                diet: db.diets.map(e=>e.name)
            }
        }
        const recetaA = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=c7455ffa96db4588bd6ae873da636768`)
        return{
            id: recetaA.data.id,
            title: recetaA.data.title,
            summary: recetaA.data.summary.replace(/<[^>]*>?/gm,''),//gm busqueda global(global match)//^ multilinea // replace: reemplaza
            healthScore: recetaA.data.healthScore,
            //instructions: recetaA.data.instructions,
            instructions: recetaA.data.analyzedInstructions[0].steps.map(e=>e.step).join(", "), //join une todos los elemetos y les separa con una ", "
            image: recetaA.data.image,
            diet: recetaA.data.diets
        }
    }catch (error){console.log( 'el error del id es: ', error)}
}

router.get('/recipes/:id', async(req,res)=>{
    const {id} = req.params;
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

router.get('/diets', async (req,res)=>{
    const dietApi= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=c7455ffa96db4588bd6ae873da636768&number=100&addRecipeInformation=true`)
    try{
       const diet= dietApi.data.results.map(e=>e.diets);
       console.log("las diet de api aca: ", diet)
       const diet2= diet.toString().split(",")//convierto el arreglo en string-- lo separo con una "," a cada dieta
       console.log("las diet 2 de api aca: ", diet2)
       diet2.forEach(e=>{
        Diet.findOrCreate({// creo la dieta en la bd, si existe la omite
            where: {name: e}
        })
       });
       const allDiet = await Diet.findAll()
       res.send(allDiet)
    }
    catch (error){console.log("el error de las dietas es: ", error)}
})

// ruta post

router.post('/recipes', async (req,res)=>{
    let {
        title,
        summary,
        healthScore,
        instructions,
        image,
        origen,
        diet
    }= req.body;
    try{
        let recipeCreated = await Recipe.create({
        title,
        summary,
        healthScore,
        instructions,
        image,
        origen
        })
        let dietDb = await Diet.findAll({ where: {name: diet}})
        recipeCreated.addDiet(dietDb)

        return res.send('Receta creada exitosamente')
    }
    catch (error){
        console.log("el error del post fue: ", error)
    }
})

////ruta delete
/*
router.delete("/delete/:id", (req,res)=>{
    try{
        const {id}= req.params;
        Recipe.destroy({where: {id: id}})
        res.send("Receta eliminada")
    }catch (error){
        console.log("el error de la ruta delete es: ", error)
    }
})
*/

////ruta put
/*
router.put('/edit/:id', async (req,res)=>{
    try{
        const{id}=req.params;
        const {
            title,
            summary,
            healthScore,
            instructions,
            image
        } = req.body;

        const modificarRec= await Recipe.update({
            title,
            summary,
            healthScore,
            instructions,
            image
        },
        {where: {id}}
        );
        res.send(modificarDog);
    }catch (error){
        console.log("El error del put es: ", error)
    }
})
*/

module.exports = router;
