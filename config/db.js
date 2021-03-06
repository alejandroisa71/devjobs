const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on("error", (error) => {
  console.log(error);
});

//importar los modelos
require("../models/Vacantes");
require("../models/Usuarios");