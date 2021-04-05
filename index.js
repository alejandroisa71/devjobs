const mongoose = require("mongoose");
require("./config/db");

const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const flash = require("connect-flash");
const createError = require("http-errors");
const passport = require("./config/passport");

require("dotenv").config({ path: "variables.env" });

const app = express();

//habilitamos body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//validacion de campos con express-validator
app.use(expressValidator());

//habilitar handlebars como view
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "layout",
    helpers: require("./helpers/handlebars"),
  })
);
app.set("view engine", "handlebars");

//static files
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// inicializar passport
app.use(passport.initialize());
app.use(passport.session());

//Alertas y flash messages
app.use(flash());

//Crear nuestro propio middleware
app.use((req, res, next) => {
  res.locals.mensajes = req.flash();
  next();
});

app.use("/", router());

//404 pagina no existente
app.use((req, res, next) => {
  next(createError(404, "No Encontrado"));
});

//Administracion de los errores
app.use((error, req, res, next) => {
  req.locals.mensaje = error.message;

  res.render("error");
});

app.listen(process.env.PUERTO);
