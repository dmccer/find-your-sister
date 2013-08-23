var meeting = require('./meeting')
/**
 * 根据姓名搜索个人位置记录和个人信息
 * @param  {String} realName 员工姓名
 * @return {Array}	位置记录 + 个人信息
 */
 exports.searchByName = function (req, res) {
	res.setHeader('content-type','text/json; charset=UTF-8')
	var meeting_rooms = meeting.queryDper('realName', req.params.name)
	return meeting_rooms
}