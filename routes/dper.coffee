sysRecords = require('../db/sys').data
meeting = require('./meeting')
seat = require('./seat')

exports.getByEmployeeId = (req, res) ->
	personInfo = query('loginId', req.params.employeeId)

	if personInfo and personInfo.length
		personInfo = personInfo[0]
	else 
		personInfo = {}
		
	personInfo.title = '个人信息'

	seatRecord = seat.query('loginId', req.params.employeeId)	

	if seatRecord.length
		seatNumber = seatRecord[0].seatNumber
	else
		seatNumber = '没有登记座位'

	personInfo.seatNumber = seatNumber

	res.render 'person', personInfo

query = exports.query = (key, val) ->
	sysRecords.filter (item) ->
		item[key].indexOf(val) != -1
	
exports.getByName = (req, res) ->
	res.setHeader 'content-type', 'text/json;charset=UTF-8'
	res.json 200, query('realName', req.params.name)

exports.get_dper_today_meetings = (req, res) ->
	meetings = meeting.queryDper("Name", req.params.name) unless req.params.name == null
	
	dpers = query('loginId', req.params.employeeId) unless req.params.employeeId == null
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




