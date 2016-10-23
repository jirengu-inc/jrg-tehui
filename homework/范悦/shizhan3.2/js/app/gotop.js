/**
 * Created by Administrator on 2016/10/23.
 */

define(function(){
    function _gotop(){
        var $gotop = $('<div class = "go-top"></div>');
        $('body').append($gotop);
        $gotop.hide();
        $(window).on('scroll',function(){
            var scrollTop = $(this).scrollTop();
            if(scrollTop>500){
                $gotop.show();
            }else{
                $gotop.hide();
            }

        });

        $gotop.on('click',function(){
            $(window).scrollTop(0);
        });
    }
    return {
        _gotop:_gotop
    }
})
