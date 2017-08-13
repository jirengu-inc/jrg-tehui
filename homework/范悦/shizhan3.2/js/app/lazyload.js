/**
 * Created by Administrator on 2016/10/20.
 */

define(function(){
    function lazy($node){
        this.lazyli=$node.find('li');
        console.log(this.lazyli)
        this.check(this.lazyli);
        this.checkWin($node);
    }

    lazy.prototype={
        checkWin:function($node){
            var clock;
            var $me =this;
            $(window).on('scroll',function(){
                if(clock == true){
                    clearTimeout(clock)
                }
                clock = setTimeout(function(){
                    $me.check($me.lazyli);
                },500)

            })
        },
        check:function($node){
            $me=this;
            $node.each(function(){
                $cur = $(this);
                if($me.isShow($cur)){
                    $me.showimg($cur)
                }
            });
        },
        isShow:function($cur){
            var scrollTop = $(window).scrollTop(),
                winH      = $(window).height(),
                top       = $cur.offset().top;
            if((scrollTop+winH)>top){
                return true
            }else{
                return false
            }
        },
        showimg:function($cur){
            $cur.animate({opacity:1},1000)
        }
    };
    return {
        lazy:lazy
    }
});