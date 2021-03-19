const mongoose = require("mongoose");
const Vacante = mongoose.model("Vacante");

exports.formularioNuevaVacante = (req, res) => {
  res.render("nueva-vacante", {
    nombrePagina: "Nueva Vacante",
    tagline: "Llena el Formulario y publica tu vacante",
  });
};

//agrega las vacantes a la base de datos
exports.agregarVacante = async (req, res) => {
  const vacante = new Vacante(req.body);
  //   console.log.log(vacante);

  //   //crear arreglo de habilidades (skills)
  vacante.skills = req.body.skills.split(",");

  console.log(vacante);
  //almacenarlo en la base de datos
  const nuevaVacante = await vacante.save();

  //redireccionar
  res.redirect(`/vacantes/${nuevaVacante.url}`);
};

//muestra una vacante
exports.mostrarVacante = async (req,res,next)=>{
  const vacante = await Vacante.findOne({url: req.params.url})

  //si no hay resultados
  if(!vacante) return next();

  res.render('vacante',{
    vacante,
    nombrePagina: vacante.titulo,
    barra: true
  })

}