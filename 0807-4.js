function slide() {
    $(".slide").each(function (idx, target) {
        var obj = $(target).find("ul")
        var len = $(target).find("li").length
        var playTime = $(target).data("time")
        var delay = $(target).data("delay")
        var type = $(target).data("type")
        var arrow = $(target).data("arrow")
        var bullet = $(target).data("bullet")
        var pos = 0
        var timer

        obj.find('li').eq(pos).addClass('active')
        obj.css('position','relative')
        switch (type){
            case 'right2left':
                obj.css({
                    display:'flex'
                })
        }

        if (arrow) {
            var arrowstyle = 'position:absolute; top:calc(50% - 25px); height: 50px; display:block;'
            var arrowleft = 'left:0;'
            var arrowright = 'right:0;'
            $("<a href='#' class='arrow left'>왼쪽</a>").attr('style',arrowstyle + arrowleft).appendTo(this)
            $("<a href='#' class='arrow right'>오른쪽</a>").attr('style',arrowstyle + arrowright).appendTo(this)
        }
        if (bullet) {
            var wrapstyle = 'position:absolute; bottom:20px; left:0; right:0; text-align:center;'
            var childstley = 'width:20px; height:20px; background: #666; transition:0.5s; display:inline-block;margin:0 3px; margin:0 3px; border-radius:20px;'
            var bulletwrap = $('<div class="pos"></div>').attr('style',wrapstyle)
            for (var i = 0; i < len; i++){
                var bulletchild = $("<a href='#'></a>").attr('style',childstley)
                if(i == 0) bulletchild.addClass('active').css('background', '#000')
                bulletchild.appendTo(bulletwrap)
            }
            bulletwrap.appendTo(target)
        }

        if(type == 'right2left')
            obj.css({width:len*100+"%", display:"flex"}).find("li").css("width", 100/len+"%")
        else  if(type == 'fade')
            obj.find('li').css({position:'absolute',left:0,top:0,width:'100%',height:'100%'}).not('.active').hide()

        function play() {
            clearTimeout(timer)
            if (++pos >= len) pos = 0
            else if(pos < 0) pos = len-1
            $(target).find(".pos a.active").removeClass('active').css("background", "#666")
            $(target).find(".pos a").eq(pos).addClass('active').css("background", "#000")
            switch (type){
                case "fade":
                    obj.find("li.active").removeClass("active").stop().fadeOut(playTime)
                    obj.find("li").eq(pos).addClass("active").stop().fadeIn(playTime)
                    break;
                case 'right2left':
                    obj.animate({
                        marginLeft:-pos*100+'%'
                    }, playTime)
                    break;
                case 'btm2top':
                    obj.animate({
                        top:-pos*100+'%'
                    }, playTime)
                    break;
            }
            timer = setTimeout(play, delay)
        }

        $(target).find('.arrow').on('click',function () {
            if ($(this).hasClass('left')) pos -= 2
            play()
            return false
        })
        $(target).find('.pos a').on('click',function () {
            pos = $(this).index() - 1
            play()
            return false
        })
        timer = setTimeout(play, delay)
    })
}
$(slide)