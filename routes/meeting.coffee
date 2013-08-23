
meetingRecords = require('../db/meeting').data

queryMeeting = (key, val) -> 
	console.log(key, val)
	
	result = 
		code: 500
		msg: null
	
	result.msg = meetingRecords.filter (item) ->
		item.MeetingRoom.Email.indexOf(val) != -1

	result.code = 200 if result.msg.length > 0
	result

queryDper = (key, val) ->

	result = 
		code: 500
		msg: null

	result.msg = meetingRecords.filter (item) ->
		console.log(item.Attendees)
		dpers = item.Attendees.filter (dper) ->
		    dper.Name.indexOf(val) != -1 unless dper.Name == null  

		return dpers.length > 0

	result.code = 200 if result.msg.length > 0
	result	

exports.getByEmail = (req, res) ->
	res.setHeader('content-type','text/json;charset=UTF-8')
	res.json(200, queryMeeting('Email', req.params.email))	
	return

exports.getByDper = (req, res) ->
	res.setHeader('content-type','text/json;charset=UTF-8')
	res.json(200, queryDper('Name', req.params.dper))