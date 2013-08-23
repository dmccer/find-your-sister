meetingRecords = require('../db/meeting').data

exports.getByEmail = (req, res) ->
	res.setHeader('content-type','text/json;charset=UTF-8')
	res.json(200, queryMeeting('Email', req.params.email))	
	return

exports.getByDper = (req, res) ->
	res.setHeader('content-type','text/json;charset=UTF-8')
	res.json(200, queryDper('Name', req.params.dper))

exports.get_deper_current_room = (req, res) ->
	res.setHeader('content-type','text/json;charset=UTF-8')
	res.json(200, queryDper_current_room("Name", req.params.dper))

queryMeeting = (key, val) -> 
	meetingRecords.filter (item) ->
		item.MeetingRoom[key].indexOf(val) != -1

# for out usage
exports.queryDper = (key, val) ->
	meetingRecords.filter (item) ->
		dpers = item.Attendees.filter (dper) -> 
		    dper[key].indexOf(val) != -1 unless dper[key] == null  
			dpers.length > 0

queryDper_current_room = (key, val) ->
	room_list = queryDper('Name', val)
	current_time = +new Date
	current_room = room_list.filter (room) ->
		start_time = +new Date("2013-" + room.STime)
		end_time = +new Date("2013-" + room.ETime)
		current_time >= start_time and current_time <= end_time
	result = if current_room.length == 0 then "他／她暂时不在开会，难道就在座位上？！" else current_room
