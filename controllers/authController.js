const passport = require("passport");
const mongoose = require("mongoose");
const Vacante = mongoose.model("Vacante");

exports.autenticarUsuario = passport.authenticate("local", {
  successRedirect: "/administracion",
  failureRedirect: "/iniciar-sesion",
  failureFlash: true,
  badRequestMessage: "Ambos campos son obligatorios",
});

//Revisar si el usuario esta autenticado o no

exports.verificarUsuario = (req, res, next) => {
  //revisar el usuario
  if (req.isAuthenticated()) {
    return next(); // estan autenticados
  }

  //redireccionar
  res.redirect("/iniciar-sesion");
};

exports.mostrarPanel = async (req, res) => {
  //consultar el usuario auntenticado
  const vacantes = await Vacante.find({ autor: req.user._id });

  res.render("administracion", {
    nombrePagina: "Panel de Administración",
    tagline: "Crea y Administra tus vacantes desde aquí",
    cerrarSesion: true,
    nombre: req.user.nombre,
    imagen: req.user.imagen,
    vacantes,
  });
};

exports.cerrarSesion = (req, res) => {
  req.logout();
  req.flash("correcto", "Cerraste Sesión Correctamente");
  return res.redirect("/iniciar-sesion");
};

//formulario para Reiniciar el password
exports.formReestablecerPassword = (req, res, next) => {
  res.render("reestablecer-password", {
    nombrePagina: "Reestablece tu Password",
    tagline: "Si ya tienes cuenta, pero olvidaste tu Password, coloca tu email",
  });
};
