var express = require('express')
var routes = require('./routes')
var location = require('./routes/location')
var dper = require('./routes/dper')
var card = require('./routes/card')
var seat = require('./routes/seat')
var meeting = require('./routes/meeting')
var search = require('./routes/search')

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

app.get('/', routes.index)
app.get('/card/name/:name', card.getByName)
app.get('/card/dept/:dept', card.getByDept)
app.get('/seat/:name', seat.getByName)
app.get('/location', location.info)
app.get('/meeting/room/:email', meeting.getByEmail)
app.get('/meeting/dper/:dper', meeting.getByDper)
app.get('/meeting/dper/:dper/now', meeting.get_deper_current_room)
app.get('/dper/id/:employeeId', dper.getByEmployeeId)
app.get('/dper/name/:name', dper.getByName)
app.get('/dper/name/:name/meetings', dper.get_dper_today_meetings)

app.get('/search/name/:name', search.searchByName)


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'))
})
