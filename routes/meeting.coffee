meetingRecords = require('../db/meeting').data

exports.getByEmail = (req, res) ->
	res.setHeader('content-type','text/json;charset=UTF-8')
	res.json(200, query('Email', req.params.email))	
	return

exports.getByDper = (req, res) ->
	res.setHeader('content-type','text/json;charset=UTF-8')
	res.json(200, query('Name', req.params.dper))

exports.get_deper_current_room = (req, res) ->
	room_list = query('Name', req.params.dper)
	
	current_time = +new Date

	current_room = room_list.filter (room) ->
		start_time = +new Date("2013-" + room.STime)
		end_time = +new Date("2013-" + room.ETime)
		current_time >= start_time and current_time <= end_time

	result = if current_room.length == 0 then "他／她暂时不在开会，难道就在座位上？！" else current_room

	res.setHeader('content-type','text/json;charset=UTF-8')
	res.json(200, result)
	

query = exports.query = (key, val) ->
	meetingRecords.filter (item) ->
		dpers = item.Attendees.filter (dper) ->
		    dper[key].indexOf(val) != -1 unless dper.Name == null  

		return dpers.length > 0

queryCurrentMeetingRoom = exports.queryCurrentMeetingRoom = (email) ->
	roomList = query('Email', email)

	currentDate = new Date()

	currentRooms = roomList.filter (room) ->
		startTime = +new Date(currentDate.getFullYear() + '-' + room.STime)
		endTime = +new Date(currentDate.getFullYear() + '-' + room.ETime)
		currentTime = currentDate.getTime() - 24*60*60*1000
		currentTime >= startTime and currentTime <= endTime
	
	currentRoom = currentRooms.sort (a, b) ->
		aStartTime = +new Date(currentDate.getFullYear() + '-' + a.STime)
		bStartTime = +new Date(currentDate.getFullYear() + '-' + b.STime)

		aStartTime - bStartTime > 0

	result = if currentRoom.length then currentRoom[0] else null
