var express = require("express");
var app = express();

var SteamApi = require("steam-api");
var apikey = "95E0B94D7BAE2D74B032FCA88F5E286A"
var user = new SteamApi.User(apikey);
var userStats = new SteamApi.UserStats(apikey);
var player = new SteamApi.Player(apikey);

// Define o Jogador e o Jogo
var playerId = "76561198120299407"
var appId = "620"

// Configura as Rotas
app.get("/", function(req, res){
	res.send("Teste da Steam API, Digite o endereço para visualizar as informações. ex: localhost:3000/jogador/amigos")
})

app.get("/jogador/level", function(req, res){
	player.GetSteamLevel(playerId).done(function(result){
		res.send("O nível do jogador " +playerId+ " é " +result);
	});
})

app.get("/jogador/amigos", function(req, res){
	user.GetFriendList(optionalRelationship = "all", playerId).done(function(result){
		res.send(result)
	});
})

app.get("/jogador/grupos", function(req, res){
	user.GetUserGroupList(playerId).done(function(result){
		res.send(result);
	});
})

app.get("/jogador/medalhas", function(req, res){
	player.GetBadges(playerId).done(function(result){
		res.send(result);
	});
})

app.get("/jogador/conquistas", function(req, res){
	userStats.GetPlayerAchievements(appId, playerId).done(function(result){
		res.send(result);
	});
})

app.get("/jogador/estatisticas", function(req, res){
	userStats.GetUserStatsForGame(appId, playerId).done(function(result){
		res.send(result);
	});
})

app.get("/jogo/jogadores", function(req, res){
	userStats.GetNumberOfCurrentPlayers(appId).done(function(result){
		res.send("Number of Current Players: " +result);
	});
})

app.get("/jogo/detalhes", function(req, res){
	userStats.GetSchemaForGame(appId).done(function(result){
		res.send(result);
	});
})

app.get("/jogo/porcentagemGlobal", function(req, res){
	userStats.GetGlobalAchievementPercentagesForApp(appId).done(function(result){
		res.send(result);
	});
})

app.get("/jogo/estatisticas", function(req, res){
	appId = 17740;
	statsName = ["global.map.emp_isle"];
	userStats.GetGlobalStatsForGame(appId, statsName).done(function(result){
		res.send(result);
	});
})

// Inicia o Servidor
app.listen(3000, function(){ 
	console.log("Servidor Express iniciado em http://localhost:3000");
}); 