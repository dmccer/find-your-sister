/**
 * Module dependencies.
 */

var express = require('express')
var routes = require('./routes')
var user = require('./routes/user')
var card = require('./routes/card')
var seat = require('./routes/seat')

var http = require('http')
var path = require('path')

var app = express()

// all environments
app.set('port', process.env.PORT || 8888)
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use(express.favicon())
app.use(express.logger('dev'))
app.use(express.bodyParser())
app.use(express.methodOverride())
app.use(express.cookieParser('your secret here'))
app.use(express.session())
app.use(app.router)
app.use(require('stylus').middleware(__dirname + '/public'))
app.use(express.static(path.join(__dirname, 'public')))

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler())
}

app.use(function (req, res, next) {
	res.charset = 'utf-8'
})

app.get('/', routes.index)
app.get('/users', user.list)
app.get('/card/:name', card.getByName)
aop.get('/seat/:name', seat.getByName)

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'))
})
