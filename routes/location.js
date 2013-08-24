var search = require('./search').search

exports.search = function (req, res) {
	var loginId = req.params.id || req.param('id')

 	var rs = search(loginId)

 	if (!rs) {
 		res.redirect('/dper/id/' + loginId)
 	}

 	res.render('location', rs)
}