var meeting = require('./meeting')
var seat = require('./seat')
var card = require('./card')
var dper = require('./dper')
/**
 * 根据姓名搜索个人位置记录和个人信息
 * @param  {String} realName 员工姓名
 * @return {Array}	位置记录 + 个人信息
 */
 exports.searchById = function (req, res) {
	var cardRecord = card.query('loginId', req.params.id)
	var seatRecord = seat.query('loginId', req.params.id)
	var personInfo = dper.query('loginId', req.params.id)

	if (!personInfo || !personInfo.length) {
		return res.redirect('/dper/' + req.params.id)
	}

	personInfo = personInfo[0]

	personInfo.location = '没找到他人'
	personInfo.title = '位置'

	// 当天没有打卡记录
	if (!cardRecord || !cardRecord.length) {
		personInfo.location = '还没有来公司上班'

		return res.render('location', personInfo)
	}

	var meetingRecord = meeting.queryCurrentMeetingRoom(personInfo.email)

	// 没有会议室记录
	if (!meetingRecord) {
		var loc = cardRecord[0].location

		// 有打卡记录
		if (loc.indexOf('进门') !== -1) {
			personInfo.location = '应该在' + loc.replace('[进门]', '')

			return res.render('location', personInfo)
		}

		// 无打卡记录
		personInfo.location = '可能在座位上：' + seatRecord[0].seatNumber
		return res.render('location', personInfo)
	}

	// 有会议室记录
	personInfo.location = meetingRecord.MeetingRoom.Name
	return res.render('location', personInfo)
}