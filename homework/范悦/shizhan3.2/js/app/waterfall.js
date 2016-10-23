/**
 * Created by Administrator on 2016/10/23.
 */

define(function(){
    function _waterfall(){
        var clock,
            page =1,
            num = 6;

            $(".moreload").on('click',function(e){
                e.preventDefault();
                Goajax();
            })

        function Goajax(){
            $.ajax({
                url: 'http://platform.sina.com.cn/slide/album_tech',
                type: 'GET',
                dataType: 'jsonp',
                jsonp:'jsoncallback',
                data: {
                    app_key:'1271687855',
                    num:num,
                    page:page
                },
                success: function(data){
                    if(data.status.code==0){
                        var data = data.data;
                        var $newli = renderData(data);
                        console.log($newli)
                        WaterFall($newli);
                    }
                },
                error: function(){
                    alert('error');
                }
            })
        }
        function renderData(data){
            var newli = '';
            for(var i =0;i<data.length;i++){
                newli += "<li class = 'item'>";
                newli += '<a href="'+data[i].url + '"class="link">';
                newli += '<img src="' + data[i].img_url + '">';
                newli += '</a>';
                newli += '<h4 class="header">' + data[i].short_name + '</h4>';
                newli += '<p class="desp">'+data[i].short_intro+'</p>';
                newli += '</li>';
            }
            var $newli = $(newli);
            $('.img-content').append($newli);
            return $newli;
        }
        var sortHight =[];//这里因为数组不能清空所以要拿到外面
        function WaterFall($el){
            var nodeW   = $el.outerWidth(true),
                colNum  = parseInt($('.img-content').width()/nodeW);
            if(sortHight.length == 0){
                for(var i =0;i<colNum;i++){
                    sortHight.push(0);
                }
            }
            $el.each(function(){
                var $cur = $(this);
                $cur.find('img').on('load',function(){
                    var idx = 0,
                        minH = sortHight[0];
                    for(var i = 0;i<sortHight.length;i++){
                        if(sortHight[i] < minH){
                            idx = i;
                            minH = sortHight[i];
                        }
                    }
                    $cur.css({
                        left:nodeW*idx,
                        top:minH
                    });
                    sortHight[idx] = $cur.outerHeight(true) + sortHight[idx];
                    $('.warp .img-content').height(Math.max.apply(null,sortHight));//这里是为了让父容器跟随item的高度，不设置的话load就会一直在最上方
                })

            });
        }
        Goajax();
    }

    return {
        _waterfall:_waterfall
    }
})



