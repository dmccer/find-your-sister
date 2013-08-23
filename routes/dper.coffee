sysRecords = require('../db/sys').data
meeting = require('./meeting')


exports.list = (req, res) -> 
	res.send("respond with a resource")

exports.getByEmployeeId = (req, res) ->
	res.setHeader 'content-type', 'text/json;charset=UTF-8'
	res.json 200, query('loginId', req.params.employeeId)

exports.getByName = (req, res) ->
	res.setHeader 'content-type', 'text/json;charset=UTF-8'
	res.json 200, query('realName', req.params.name)

exports.get_dper_today_meetings = (req, res) ->

	meetings = meeting.queryDper("Name", req.params.name) unless req.params.name == null
	
	dpers = query('loginId', req.params.employeeId)  unless req.params.employeeId == null
	dper = dpers[0]

	meetings = meeting.queryDper("Email", dpers[0].email)

	result = meetings.map (item) ->
		room =
			Name: dper.realName
			MeetingRoom : item.MeetingRoom
			STime : item.STime
			ETime : item.ETime

	res.setHeader 'content-type','text/json;charset=UTF-8'
	res.json 200, result

query = (key, val) ->
	console.log(key,val)
	sysRecords.filter (item) ->
		item[key].indexOf(val) != -1




