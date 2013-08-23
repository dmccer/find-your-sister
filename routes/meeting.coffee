
meetingRecords = require('../db/meeting').data

query = (key, val) -> 
	console.log(key, val)
	result =
		meeting: 
			name: "伤不起"
			email: "shangbuqi@dianping.com"

exports.getByEmail = (req, res) ->
	res.setHeader('content-type','text/json;charset=UTF-8')
	res.json(200, query('Email', req.params.name))	
	return
