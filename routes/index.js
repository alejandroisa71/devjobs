const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const vacantesController = require("../controllers/vacantesController");
const usuariosController = require('../controllers/usuariosController')
module.exports = () => {
  router.get("/", homeController.mostrarTrabajos);

  //Crear Vacantes
  router.get("/vacantes/nueva", vacantesController.formularioNuevaVacante);
  router.post("/vacantes/nueva", vacantesController.agregarVacante);

  //Mostrar Vacante (singular)
  router.get("/vacantes/:url", vacantesController.mostrarVacante);

  // Editar Vacante
  router.get("/vacantes/editar/:url", vacantesController.formEditarVacante);
  router.post("/vacantes/editar/:url", vacantesController.editarVacante);

  //Crear Cuentas
  router.get('/crear-cuenta', usuariosController.formCrearCuenta)

  return router;
};
