sysRecords = require('../db/sys').data
meeting = require('./meeting')


exports.list = (req, res) -> 
	res.send("respond with a resource")

exports.getByEmployeeId = (req, res) ->
	res.setHeader 'content-type', 'text/json;charset=UTF-8'
	res.json 200, query('EmployeeId', req.params.employeeId)

exports.get_dper_today_meetings = (req, res) ->
	result = 
		code: 200
		msg: null

	meetings = meeting.queryDper("Name", req.params.name).msg
	console.log meetings

	result.msg = meetings.map (item) ->
		room =
			Name: req.params.name
			MeetingRoom : item.MeetingRoom
			STime : item.STime
			ETime : item.ETime
		

	res.setHeader 'content-type','text/json;charset=UTF-8'
	res.json 200, result

query = (key, val) ->
	result = 
		code: 500
		msg: null

	result.msg = sysRecords.filter (item) ->
		item.loginId.indexOf(val) != -1
		
	result.code = 200 if result.msg.length > 0
	result




