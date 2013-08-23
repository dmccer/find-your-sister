
/*
 * GET person info.
 */

exports.info = function(req, res){
   res.render('person', { title: 'person' });
};