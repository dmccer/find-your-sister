var meeting = require('./meeting')
var seat = require('./seat')
var card = require('./card')
var dper = require('./dper')

var search = exports.search = function (loginId) {
	var cardRecord = card.query('loginId', loginId)
	var seatRecord = seat.query('loginId', loginId)
	var personInfo = dper.query('loginId', loginId)

	if (!personInfo || !personInfo.length) {
		return 
	}

	personInfo = personInfo[0]

	personInfo.location = '没找到他人'
	personInfo.title = '位置'


	// 当天没有打卡记录
	if (!cardRecord) {
		personInfo.location = '还没有来公司上班'

		return personInfo
	}

	var meetingRecord = meeting.queryCurrentMeetingRoom(personInfo.email)

	// 没有会议室记录
	if (!meetingRecord) {
		var loc = cardRecord.location

		// 有打卡记录
		if (loc.indexOf('进门') !== -1) {
			var doorLoc = loc.replace('[进门]', '')

			if (doorLoc.indexOf('-') !== -1) {
				doorLoc = doorLoc.split('-')[0]
			}

			if (seatRecord[0].seatNumber.indexOf('-') !== -1) {
				var seatLoc = seatRecord[0].seatNumber.split('-')[0]
			}

			if (doorLoc.indexOf(seatLoc) === 0) {
				personInfo.location = '应该在座位上' +  seatRecord[0].seatNumber
				return personInfo
			}

			personInfo.location = '应该在' + doorLoc

			return personInfo
		}

		// 无打卡记录
		personInfo.location = '可能在座位上：' + seatRecord[0].seatNumber
		return personInfo
	}

	// 有会议室记录
	personInfo.location = meetingRecord.MeetingRoom.Name
	return personInfo
}

/**
 * 根据姓名搜索个人位置记录和个人信息
 * @param  {String} realName 员工姓名
 * @return {Array}	位置记录 + 个人信息
 */
 exports.searchById = function (req, res) {
 	var loginId = req.params.id || req.param('id')

 	var rs = search(loginId)

 	if (!rs) {
 		res.redirect('/dper/id/' + loginId)
 	}

 	res.render('location', rs)
	
}