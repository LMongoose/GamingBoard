var SteamApi = require("steam-api");

var apikey = "95E0B94D7BAE2D74B032FCA88F5E286A"

var user = new SteamApi.User(apikey, optionalSteamId);
var userStats = new SteamApi.UserStats(apikey, optionalSteamId);
var news = new SteamApi.News(apikey);
var app = new SteamApi.App(apikey);
var player = new SteamApi.Player(apikey, optionalSteamId);
var inventory = new SteamApi.Inventory(apikey, optionalSteamId);
var items = new SteamApi.Items(apikey, optionalSteamId);

// Steam API Backpack
items.GetPlayerItems(appId, optionalSteamId).done(function(result){
	console.log(result);
});

// Inventory
inventory.GetAppItems(appId, optionalSteamId).done(function(result){
	console.log(result);
});

// User methods
user.GetPlayerBans(optionalSteamId).done(function(result){
	console.log(result);
});

user.GetFriendList(optionalRelationship = "all", optionalSteamId).done(function(result){
	console.log(result);
});

user.GetUserGroupList(optionalSteamId).done(function(result){
	console.log(result);
});

//// e.g. vanityUrl = "pr00fgames";
user.ResolveVanityUrl(vanityUrl).done(function(result){
	console.log(result);
});


// UserStats methods
//// e.g. appId = 17740;
//// e.g. statsName = ["global.map.emp_isle"];
userStats.GetGlobalStatsForGame(appId, statsName).done(function(result){
	console.log(result);
});

//// e.g. appId = 620;
userStats.GetNumberOfCurrentPlayers(appId).done(function(result){
	console.log(result);
});

userStats.GetSchemaForGame(appId).done(function(result){
	console.log(result);
});

userStats.GetPlayerAchievements(appId, optionalSteamId).done(function(result){
	console.log(result);
});

userStats.GetGlobalAchievementPercentagesForApp(appId).done(function(result){
	console.log(result);
});

userStats.GetUserStatsForGame(appId, optionalSteamId).done(function(result){
	console.log(result);
});


// News Methods
news.GetNewsForApp(appId,
				optionalCount = 5,
				optionalMaxLength = null
				).done(function(result){
	console.log(result);
});


// App Methods
app.appDetails(appId).done(function(result){
	console.log(result);
});

app.GetAppList().done(function(result){
	console.log(result);
});

app.GetServersAtAddress(addressOrIp).done(function(result){
	console.log(result);
});

app.UpToDateCheck(appId, version).done(function(result){
	console.log(result);
});


// Player Methods
player.GetSteamLevel(optionalSteamId).done(function(result){
	console.log(result);
});

player.GetPlayerLevelDetails(optionalSteamId).done(function(result){
	console.log(result);
});

player.GetBadges(optionalSteamId).done(function(result){
	console.log(result);
});

player.GetCommunityBadgeProgress(optionalBadgeId, optionalSteamId).done(function(result){
	console.log(result);
});

player.GetOwnedGames(optionalSteamId, 
					optionalIncludeAppInfo = true, 
					optionalIncludePlayedFreeGames = false, 
					optionalAppIdsFilter = []
					).done(function(result){
	console.log(result);
});