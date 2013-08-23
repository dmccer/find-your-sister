var seatRecords = require('../db/seat').data


/**
 * 根据姓名搜索座位记录
 * @param  {String} realName 员工姓名
 * @return {Array}	座位记录
 */
exports.getByName = function (req, res) {
	res.setHeader('content-type','text/json; charset=UTF-8')

	var searchTime = +new Date

	var result = seatRecords.filter(function (item) {
		return item.realName.indexOf(req.params.name) !== -1
			//&& (searchTime - (new Date(item.time)).getTime()) < deviation
	})

	res.json(200, {
		locs: result
	})
}