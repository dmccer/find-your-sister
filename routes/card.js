var cardRecords = require('../db/card').data


/**
 * 根据姓名搜索打卡记录
 * @param  {String} realName 员工姓名
 * @return {Array}	打卡记录
 */
exports.getByName = function (req, res) {
	res.setHeader('content-type','text/json; charset=UTF-8');

	var searchTime = +new Date
	var deviation = 24*60*60*1000*2

	var realName = '钱吉'

	var result = cardRecords.filter(function (item) {
		return item.realName === realName 
			&& (searchTime - (new Date(item.time)).getTime()) < deviation
	})

	res.json(200, {
		locs: result
	})
}