var seatRecords = require('../db/seat').data

var query = exports.query = function (key, val) {
	var searchTime = +new Date

	return seatRecords.filter(function (item) {
		return item[key].indexOf(val) !== -1
	})
}

/**
 * 根据姓名搜索座位记录
 * @param  {String} realName 员工姓名
 * @return {Array}	座位记录
 */
exports.getByName = function (req, res) {
	res.setHeader('content-type','text/json; charset=UTF-8')

	res.json(200, {
		locs: query('realName', req.params.name)
	})
}