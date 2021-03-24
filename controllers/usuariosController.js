const mongoose = require("mongoose");
const Usuarios = mongoose.model("Usuarios");

exports.formCrearCuenta = (req, res) => {
  res.render("crear-cuenta", {
    nombrePagina: "Crea tu cuenta En devJobs",
    tagline:
      "Comienza a publicar tus vacantes gratis,solo debes crear una cuenta ",
  });
};

exports.validarRegistro = (req, res, next) => {
  //sanitizar los campos
  req.sanitizeBody("nombre").escape();
  req.sanitizeBody("email").escape();
  req.sanitizeBody("password").escape();
  req.sanitizeBody("confirmar").escape();

  //validar campos
  req.checkBody("nombre", "El Nombre es Obligatorio").notEmpty();
  req.checkBody("email", "El email debe ser Válido").isEmail();
  req.checkBody("password", "El Password no puede ir vacio").notEmpty();
  req.checkBody("confirmar", "Confirmar Password no puede ir vacio").notEmpty();
  //compara passqoerd y confirmar
  req
    .checkBody("confirmar", "El password es diferente")
    .equals(req.body.password);

  const errores = req.validationErrors();

  if (errores) {
    //si hay errores
    req.flash(
      "error",
      errores.map((error) => error.msg)
    );

    res.render("crear-cuenta", {
      nombrePagina: "Crea tu cuenta En devJobs",
      tagline:
        "Comienza a publicar tus vacantes gratis,solo debes crear una cuenta",
      mensajes: req.flash(),
    });
    return;
  }

  //si toda la validacion es correcta
  next();
};

exports.crearUsuario = async (req, res, next) => {
  //crear el usuario
  const usuario = new Usuarios(req.body);

  try {
    await usuario.save();
    res.redirect("/iniciar-sesion");
  } catch (error) {
    req.flash("error", error);
    res.redirect("/crear-cuenta");
  }
};
