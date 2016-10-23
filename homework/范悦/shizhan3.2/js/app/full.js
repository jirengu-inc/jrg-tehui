/**
 * Created by Administrator on 2016/10/22.
 */
define(function(){
    function init($el) {
        var $ct = $el.find('.img-ct'),
            $items = $ct.children(),
            $pre = $el.find($('.pre')),
            $next = $el.find($('.next')),
            $nav = $('.carousel-nav'),
            imgWidth = $(window).width(),
            imgCount = $ct.children().size();
        
            $ct.prepend($items.last().clone());
            $ct.append($items.first().clone());
        $ct.find('.item').css('width',imgWidth);
        $ct.find('.cover').css('width',imgWidth);
        imgnewwidth = $ct.children().size();
        $ct.css({left:0-imgWidth,width:imgnewwidth*imgWidth});



        var curIdx = 0,
            lock = false;

        $next.on('click',function(e){
            e.preventDefault();
            playnext();
        })
        $pre.on('click',function(e){
            e.preventDefault();
            playpre();
        })

        $nav.find('li').on('click',function(){
            var idx = $(this).index();
            setBg(idx+1);
            if(idx>curIdx){
                playnext(idx-curIdx);
            }else if(idx<curIdx){
                playpre(curIdx-idx);
            }
        })

        function playnext(idx){
            var mov = idx || 1;
            if(!lock){
                lock = true;
                setBg(curIdx+2);
                $ct.animate({left: '-='+(mov*imgWidth)},function(){
                    /*curIdx = (mov+curIdx)%imgCount;
                     if(curIdx === 0){
                     $ct.css({left:0-imgWidth});
                     }*/
                    curIdx+=mov;
                    if(curIdx === imgCount){
                        $ct.css({left:0-imgWidth});
                        curIdx = 0;
                    }
                    lock = false;
                    setnav();
                })

            }
        }
        setBg(1);
        autoplay();
        function playpre(idx){
            var mov = idx || 1;
            if(!lock){
                lock = true;
                setBg(curIdx);
                $ct.animate({left: '+='+(mov*imgWidth)},function(){
                    /*curIdx = (imgCount + curIdx-mov)%imgCount;
                     if(curIdx === imgCount-1){
                     $ct.css({left:0-imgWidth*imgCount});
                     }*/
                    curIdx-=mov;
                    if(curIdx === (-1)){
                        $ct.css({left:0-imgWidth*imgCount});
                        curIdx = 3;
                    }
                    lock = false;
                    setnav();
                })

            }
        }

        function setnav(){
            $nav.find('li').removeClass('setcolor');
            $nav.find('li').eq(curIdx).addClass('setcolor');
        }

        function autoplay(){
            clock = setInterval(function(){
                playnext();
            }, 2000);
        }


        function setBg(idx){
            var idx = idx || 0;
            if(idx === 0){
                $node = $ct.children().eq(idx);
                $cover = $node.find('.cover');
                imgUrl = $cover.attr('img-data');
                $('.cover').eq(imgCount).css('background-image' , 'url('+ imgUrl +')');
            }

            $node = $ct.children().eq(idx);
            $cover = $node.find('.cover');
            imgUrl = $cover.attr('img-data');
            if($node.data('isBgSet')) return;
            $cover.css('background-image' , 'url('+ imgUrl +')');
            $node.data('isBgSet', true);
        }
    }
    return {
        init:init
    }
})

