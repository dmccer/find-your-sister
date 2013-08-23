var seatRecords = require('../db/seat').data


/**
 * 根据姓名搜索座位记录
 * @param  {String} realName 员工姓名
 * @return {Array}	座位记录
 */
exports.getByName = function (req, res) {
	var searchTime = +new Date
	var deviation = 5*60*1000

	var realName = '朱广彬'

	var result = seatRecords.filter(function (item) {
		return item.realName === realName 
			//&& (searchTime - (new Date(item.time)).getTime()) < deviation
	})

	res.json(200, {
		locs: result
	})
}