var bodyParser = require("body-parser");
var path = require("path");
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var app = express();

var SteamApi = require("steam-api");
var apikey = "95E0B94D7BAE2D74B032FCA88F5E286A"
var user = new SteamApi.User(apikey);
var userStats = new SteamApi.UserStats(apikey);
var player = new SteamApi.Player(apikey);

// Define o Jogador e o Jogo
//TODO: pegar dos textfields do dash
var playerId = "76561198120299407"
var appId = "620"

// Cria Conexão com o Banco 
mongoose.connect("mongodb://<gamingboard>:<178%4jkls>@ds117431.mlab.com:17431/gamingboard", { useMongoClient: true });

// Verifica conexão com o Banco
var dbObject = mongoose.connection;
dbObject.on("error", console.error.bind(console, "Não foi possível se conectar no MongoDB!"));
dbObject.once("open", function(){
	console.log("Aplicação conectada no MongoDB");
});

// Cria um modelo baseado em um schema (http://mongoosejs.com/docs/guide.html) do Mongoose
// Tipos podem ser definidos http://mongoosejs.com/docs/schematypes.html
var Usuario = mongoose.model("users",
	new mongoose.Schema({
		username: { type: String, required: [true, "O nome de usuário é obrigatório!"]},
		password: { type: String, required: [true, "A senha é obrigatória!"]},
		email: { type: String, required: [false]}
	})
);

// Configuração do Renderizador de Páginas (EJS)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

// Rotas
app.get("/", function(req, res){
   res.render("login")
});

app.get("/login", function(req, res){
	res.render("login")
 });

app.get("/newuser", function(req, res){
	res.render("newuser")
});

app.post("/dash", function(req, res){
	res.render("dash")
});

app.get("/dash/jogador/level", function(req, res){
	player.GetSteamLevel(playerId).done(function(result){
		res.send("O nível do jogador " +playerId+ " é " +result);
	});
})

app.get("/dash/jogador/amigos", function(req, res){
	user.GetFriendList(optionalRelationship = "all", playerId).done(function(result){
		res.send(result)
	});
})

app.get("/dash/jogador/grupos", function(req, res){
	user.GetUserGroupList(playerId).done(function(result){
		res.send(result);
	});
})

app.get("/dash/jogador/insignias", function(req, res){
	player.GetBadges(playerId).done(function(result){
		res.send(result);
	});
})

app.get("/dash/jogador/conquistas", function(req, res){
	userStats.GetPlayerAchievements(appId, playerId).done(function(result){
		res.send(result);
	});
})

app.get("/dash/jogador/estatisticas", function(req, res){
	userStats.GetUserStatsForGame(appId, playerId).done(function(result){
		res.send(result);
	});
})

app.get("/dash/jogo/jogadores", function(req, res){
	userStats.GetNumberOfCurrentPlayers(appId).done(function(result){
		res.send("Número de jogadores online: " +result);
	});
})

app.get("/dash/jogo/detalhes", function(req, res){
	userStats.GetSchemaForGame(appId).done(function(result){
		res.send(result);
	});
})

app.get("/dash/jogo/porcentagemGlobal", function(req, res){
	userStats.GetGlobalAchievementPercentagesForApp(appId).done(function(result){
		res.send(result);
	});
})

app.get("/dash/jogo/estatisticas", function(req, res){
	appId2 = 17740;
	statsName = ["global.map.emp_isle"];
	userStats.GetGlobalStatsForGame(appId2, statsName).done(function(result){
		res.send(result);
	});
})

// BANCO
app.post("/create", function(req, res){
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