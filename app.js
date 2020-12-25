var bodyParser = require("body-parser");
var path = require("path");
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var app = express();

var SteamAPI = require("steamapi");
const apikey = ""
const steam = new SteamAPI(apikey);

//TODO: pegar dos textfields do dash
var playerId = "76561198120299407"
var appId = "620"

//// Cria Conexão com o Banco 
//mongoose.connect("mongodb://<gamingboard>:<178%4jkls>@ds117431.mlab.com:17431/gamingboard", { useMongoClient: true });

//// Verifica conexão com o Banco
//var dbObject = mongoose.connection;
//dbObject.on("error", console.error.bind(console, "Não foi possível se conectar no MongoDB!"));
//dbObject.once("open", function(){
//	console.log("Aplicação conectada no MongoDB");
//});

//// Cria um modelo baseado em um schema (http://mongoosejs.com/docs/guide.html) do Mongoose
//// Tipos podem ser definidos http://mongoosejs.com/docs/schematypes.html
//var Usuario = mongoose.model("users",
//	new mongoose.Schema({
//		username: { type: String, required: [true, "O nome de usuário é obrigatório!"]},
//		password: { type: String, required: [true, "A senha é obrigatória!"]},
//		email: { type: String, required: [false]}
//	})
//);

// Configuração do Renderizador de Páginas (EJS)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

// Rotas
app.get("/", (req, res) => {
   res.redirect("/login");
});

app.get("/login", (req, res) => {
	res.render("login");
 });

app.get("/newuser", (req, res) => {
	res.render("newuser");
});

app.post("/dash", (req, res) => {
	res.render("dash");
});

app.get("/dash/jogador/level", (req, res) => {
    steam.getUserLevel(playerId).then(id => {
        res.send("Level: " + id);
    })
});

app.get("/dash/jogador/amigos", (req, res) => {
	
});

app.get("/dash/jogador/grupos", (req, res) => {
	
});

app.get("/dash/jogador/insignias", (req, res) => {
	
});

app.get("/dash/jogador/conquistas", (req, res) => {
	
});

app.get("/dash/jogador/estatisticas", (req, res) => {
	
});

app.get("/dash/jogo/jogadores", (req, res) => {
	
});

app.get("/dash/jogo/detalhes", (req, res) => {
	
});

app.get("/dash/jogo/porcentagemGlobal", (req, res) => {
	
});

app.get("/dash/jogo/estatisticas", (req, res) => {
	
});

// BANCO
app.post("/create", (req, res) => {
	var username = req.body.usr
	var email = req.body.email
	var password = req.body.pwd

	new Usuario({"username": username, "email": email, "password": password}).save(function(err, obj){
		if (err){
			console.error(err)
			res.status(500).send("Erro na aplicação: " + err.message)
		} else {
			console.log("Usuário Adicionado!")
			res.redirect("/")
		}
	})
});

app.set("port", (process.env.PORT || 3000));
app.listen(app.get("port"), function(){
	console.log("Servidor Inicializado na Porta", app.get("port"));
});

module.exports = app;
