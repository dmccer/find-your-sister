meetingRecords = require('../db/meeting').data

exports.getByEmail = (req, res) ->
	res.setHeader('content-type','text/json;charset=UTF-8')
	res.json(200, query('Email', req.params.email))	
	return

exports.getByDper = (req, res) ->
	res.setHeader('content-type','text/json;charset=UTF-8')
	res.json(200, query('Name', req.params.dper))

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
	

query = exports.query = (key, val) ->
	meetingRecords.filter (item) ->
		dpers = item.Attendees.filter (dper) ->
		    dper[key].indexOf(val) != -1 unless dper.Name == null  

		return dpers.length > 0

queryCurrentMeetingRoom = exports.queryCurrentMeetingRoom = (email) ->
	roomList = query('Email', email)

	currentDate = new Date()

	dataTime = new Date()
	dataTime.setFullYear(2013)
	dataTime.setMonth(7)
	dataTime.setDate(23)

	ODT = 24*60*60*1000
	gapTime = currentDate.getTime() - dataTime.getTime()
	gapDays = Math.floor(gapTime/ODT)

	currentRooms = roomList.filter (room) ->
		startTime = +new Date(currentDate.getFullYear() + '-' + room.STime)
		endTime = +new Date(currentDate.getFullYear() + '-' + room.ETime)
		currentTime = currentDate.getTime() - gapDays * ODT
		currentTime >= startTime and currentTime <= endTime
	
	currentRoom = currentRooms.sort (a, b) ->
		aStartTime = +new Date(currentDate.getFullYear() + '-' + a.STime)
		bStartTime = +new Date(currentDate.getFullYear() + '-' + b.STime)

		aStartTime - bStartTime > 0

	result = if currentRoom.length then currentRoom[0] else null
