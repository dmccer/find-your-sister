meetingRecords = require('../db/meeting').data

exports.getByEmail = (req, res) ->
	res.setHeader('content-type','text/json;charset=UTF-8')
	res.json(200, queryMeeting('Email', req.params.email))	
	return

exports.getByDper = (req, res) ->
	res.setHeader('content-type','text/json;charset=UTF-8')
	res.json(200, queryDper('Name', req.params.dper))

exports.get_deper_current_room = (req, res) ->
	result = 
		code: 500
		msg: null

	room_list = queryDper('Name', req.params.dper).msg
	
	current_time = +new Date
	current_room = room_list.filter (room) ->
		start_time = +new Date("2013-" + room.STime)
		end_time = +new Date("2013-" + room.ETime)
		current_time >= start_time and current_time <= end_time

	result.code = 200
	result.msg = if current_room.length == 0 then "他／她暂时不在开会，难道就在座位上？！" else current_room

	res.setHeader('content-type','text/json;charset=UTF-8')
	res.json(200, result)

queryMeeting = (key, val) -> 
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

		dpers = item.Attendees.filter (dper) ->
		    dper.Name.indexOf(val) != -1 unless dper.Name == null  

		return dpers.length > 0

	result.code = 200 if result.msg.length > 0
	result	
