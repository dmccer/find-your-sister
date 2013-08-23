(function (WIN, UNDF) {
	var modA = {
		init: function () {
			$('#search-input').keypress(function(){
				console.log("changing")
			})
		}
	}
	// 前端 javascript 入口
	$(function () {
		modA.init()
	})

})(window)