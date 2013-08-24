var cardRecords = require('../db/card').data

var query = exports.query = function (by, val) {
	var ODT = 24*60*60*1000
	var searchTime = new Date()
	var dataTime = new Date()

	dataTime.setFullYear(2013)
	dataTime.setMonth(7)
	dataTime.setDate(22)

	var gapTime = searchTime.getTime() - dataTime.getTime()
	var gapDays = Math.floor(gapTime/ODT)

	var startRecordDate = new Date(searchTime.getFullYear(), searchTime.getMonth(), searchTime.getDate() - gapDays, 0, 0, 0)
	var startRecordTime = startRecordDate.getTime()
	var endRecordDate = new Date(searchTime.getFullYear(), searchTime.getMonth(), searchTime.getDate() - gapDays, 23, 59, 59)
	var endRecordTime = endRecordDate.getTime()

	var oneDayResult = cardRecords.filter(function (item) {
		var recordDate = new Date(item.time)
		var recordTime = recordDate.getTime()

		return item[by].indexOf(val) !== -1
			&& recordTime <= endRecordTime
			&& recordTime >= startRecordTime
			&& recordTime <= searchTime.getTime() - gapDays * ODT
	})

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