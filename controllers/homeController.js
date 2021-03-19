const mongoose= require('mongoose');
const Vacante = mongoose.model('Vacante')

exports.mostrarTrabajos = async (req, res,next) => {

  const vacantes = await Vacante.find();

  if(!vacantes) return next();

 console.log(vacantes) 

  res.render("home", {
    nombrePagina: "devJobs",
    tagline: "Encuentra y Publica trabajos para Desarrolladores Web",
    barra: true,
    boton: true,
    vacantes
  });
};
