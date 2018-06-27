var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var SteamApi = require('steam-api');


var app = express();

// Cria Conexão com o MongoDB
mongoose.connect("mongodb://<admin-gamingboard>:<admin135792468>@ds117431.mlab.com:17431/gamingboard", { useMongoClient: true });

// Verifica conexão com MongoDB
var dbMongo = mongoose.connection;
dbMongo.on('error', console.error.bind(console, 'Não foi possível se conectar ao MongoDB!'));
dbMongo.once('open', function (){
	console.log('Aplicação conectada ao MongoDB');
});

// Cria um modelo baseado em um schema do Mongoose (http://mongoosejs.com/docs/guide.html)
// Mais tipos podem ser encontrados em http://mongoosejs.com/docs/schematypes.html
var User= mongoose.model('users',
	new mongoose.Schema({
		username: { type: String, required: [true, 'O nome de usuário é obrigatório!']},
		password: { type: String, required: [true, 'A senha é obrigatória!']},
		email: { type: String, required: [true, 'O E-Mail é obrigatório!']}
	}));

// Configuração do Renderizador de Páginas (EJS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

// Rotas
app.get('/', function (req, res) {
   res.render('login')
});

app.get('/login', function (req, res) {
	res.render('login')
 });

app.post('/dash', function (req, res) {
	res.render('dash')
});

app.get('/newuser', function (req, res) {
	res.render('newuser')
});

app.post('/create', function (req, res) {
	var username = req.body.txtUsername
	var email = req.body.txtEmail
	var password = req.body.txtPassword

	new User({'username': username, 'email': email, 'password': password}).save(function(err, obj) {
		if (err) {
			console.error(err)
			res.status(500).send("Erro na aplicação: " + err.message)
		} else {
			console.log('Usuário Adicionado!')
			res.redirect('/')
		}
	})
});

//app.post('/tarefa/remover', function (req, res){
//	var tarefasParaRemover = req.body.tarefas;
//
//	if (typeof tarefasParaRemover != 'object'){
//		tarefasParaRemover = [tarefasParaRemover];
//	}
//
//	for (var posicao = 0; posicao < tarefasParaRemover.length; posicao++){
//		console.log(tarefasParaRemover[posicao]);
//		Tarefa.remove({ '_id': mongoose.Types.ObjectId(tarefasParaRemover[posicao]) }, function (err){
//			if (err){
//				console.error(err);
//				res.status(500).send('Erro na aplicação: ' + err.message);
//			}
//		});
//	}
//
//	res.redirect('/');
//});

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function (){
	console.log('Servidor Inicializado na Porta', app.get('port'));
});

module.exports = app;