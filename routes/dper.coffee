sysRecords = require('../db/sys').data

exports.list = (req, res) -> 
	res.send("respond with a resource")

exports.getByEmployeeId = (req, res) ->
	res.setHeader('content-type','text/json;charset=UTF-8')
	res.json 200, query('EmployeeId', req.params.employeeId)

query = exports.query = (key, val) ->
	sysRecords.filter (item) ->
		item[key].indexOf(val) != -1
	
	


