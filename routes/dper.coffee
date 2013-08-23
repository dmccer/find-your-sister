sysRecords = require('../db/sys').data

exports.list = (req, res) -> 
	res.send("respond with a resource")

exports.getByEmployeeId = (req, res) ->
	res.setHeader('content-type','text/json;charset=UTF-8')
	res.json 200, query('EmployeeId', req.params.employeeId)

query = (key, val) ->
	result = 
		code: 500
		msg: null

	result.msg = sysRecords.filter (item) ->
		item.loginId.indexOf(val) != -1
		
	result.code = 200 if result.msg.length > 0
	result

	


