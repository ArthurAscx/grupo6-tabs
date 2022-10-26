const db = require("../Database/models")
const sequelize = require("sequelize");
let disc = {

    all: async function (req, res) {
        try {
            let allDiscs = await db.Disc.findAll();
            allDiscs ?
            res.json({
                total: allDiscs.length,
                data: allDiscs,
                status: 200
            }) 
            :
            res.send("No se recibió informacion")

        } catch (error) {
            res.send("Error en la consulta "+ error)
        }
    },

    disc: async (req, res) => {
        try {
            let discFound = await db.Disc.findByPk(req.params.id);
            discFound ? res.json({
                data: discFound,
                status: 200
            })
            :
            res.send("El disco no existe")
        } catch (error) {
            res.send("Error en la consulta")
        }
    },

    newDisc: async (req,res)=>{
        try {
            let createdDisc = await db.Disc.create(req.body);
            createdDisc ? res.json({
                data: createdDisc,
                status: 200
            })
            :
            // Aquí teoricamente no llega nunca porque el sequelize tiene unas validaciones de campos no nulos que hacen que caiga en el catch
            res.send("El disco creado esta vacio")
        } catch (error) {
            console.log(req.body);
            res.send("Error al momento de crear un disco " + error)
        }
    },

    editDisc: async (req,res) =>{
        try {
            let discToEdit = await db.Disc.update({
                price: Number(req.body.price),
                title: req.body.title,
                artwork: req.body.artwork,
                sales: Number(req.body.sales),
                releaseYear: req.body.releaseYear,
                description: req.body.description,
                idArtist: Number(req.body.idArtist),
                idGenre: Number(req.body.idGenre)
                },
                {
                    where: {idDisc: req.params.id}
                })
                // REVISAR ESTO PARA PODER CARGAR LAS FOTOS Y AÑADIRLAS
                //if (req.file) {
                //     fs.unlinkSync("./public/img/productos/" + p.image);
                //     p.image = req.file.filename;
                // }
                res.send(discToEdit)
        } catch (error) {
            res.send("There is an error: "+ error)
        }
        
    }
};
module.exports = disc;