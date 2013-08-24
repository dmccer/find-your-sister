(function(WIN, UNDF) {
    var modA = {
        init: function () {
            $('#search-input').keyup(function () {
                var str = $('#search-input').val()
                
                if (!str) {
                	return
                }

                $.ajax({
                    url: "/dper/name/" + str,
                    dataType: "json",
                    success: function(data) {
                        var ul = $('#acList')
                        var html = ""
                        var len = 0
                        if (data.length > 5) {
                            len = 5
                        } else {
                            len = data.length
                        }
                        for (var i = 0; i < len; i++) {
                            html = html + "<li><a href = 'search/" + data[i].loginId + "'>" + data[i].realName + " " + data[i].department + "</a></li>"
                        };
                        ul.html(html)
                    },
                    error: function() {
                        console.log("ajax fail")
                    }
                })
            })
            // $('#acList').click(function(e){
            // 	var loginId = $(e.target).attr('data-loginId')
            // 	// $('#search-input').val($(e.target).html())
            // 	// $(e.currenTarget).hide()
            // })
        }
    }
    // 前端 javascript 入口
    $(function() {
        modA.init()
    })

})(window)