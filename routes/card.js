var cardRecords = require('../db/card').data

var query = function (by, val) {
	var searchTime = new Date()

	var startRecordTime = (new Date(searchTime.getFullYear(), searchTime.getMonth(), searchTime.getDate() - 1, 0, 0, 0)).getTime()
	var endRecordTime = (new Date(searchTime.getFullYear(), searchTime.getMonth(), searchTime.getDate() - 1, 23, 59, 59)).getTime()

	var oneDayResult = cardRecords.filter(function (item) {
		var recordTime = (new Date(item.time)).getTime()

		return item[by].indexOf(val) !== -1
			&& recordTime <= endRecordTime
			&& recordTime >= startRecordTime
			&& recordTime <= searchTime.getTime() - 24*60*60*1000
	})

	console.log(by, val)

	oneDayResult.sort(function (a, b) {
		return (new Date(b.time)).getTime() - (new Date(a.time)).getTime()
	})

	if (oneDayResult.length) {
		return oneDayResult[0]
	}

	return null
}

/**
 * 根据姓名搜索打卡记录
 * @param  {String} realName 员工姓名
 * @return {Object}	打卡记录
 */
exports.getByName = function (req, res) {
	res.setHeader('content-type','text/json; charset=UTF-8')

	res.json(200, query('realName', req.params.name))
}

/**
 * 根据部门搜苏打卡记录
 * @param {String} department 部门
 * @return {Object} 打卡记录
 */
exports.getByDept = function (req, res) {
	res.setHeader('content-type','text/json; charset=UTF-8')

	res.json(200, query('department', req.params.dept))
}