

 function Fm(){
     this.styleM='public_yuzhong_oumei';
     this.audio=$('audio');//音频元素
     this.songCover=$('.songcover img');//封面图片元素
     this.song=$('.song');//歌曲名
     this.singer=$('.singer');//歌手名
     this.play=$('.play');//播放键
     this.pause=$('.pause');//暂停键
     this.next=$('.next');//下一首
     this.pre='aa';//上一首
     this.style=$('.style');//风格选择菜单按钮
     this.stylecnt=$('.stylecnt');//风格选择菜单列表
     this.volume=$('.volume');//音量控件
     this.slider=$('.slider');//音乐进度滑块
     this.progress=$('.progress');//音乐进度条
     this.before=$('.befortime');//当前音乐时间
     this.time=$('.time');//音乐总时长
     this.clock=true;//设置音乐锁
     this.bind();//绑定按钮事件
     this.getMusiceStyle();
     this.getMusice(this.styleM);//获取随机音乐函数

}

Fm.prototype={
    //绑定播放器控件函数
    bind:function(){
        var me =this;
        //播放按钮
        me.play.on('click',function(){
            me.play.hide();
            me.pause.show();
            me.audio[0].play();
        });
        //暂停按钮
        me.pause.on('click',function(){
            me.pause.hide();
            me.play.show();
            me.audio[0].pause();
        });
        //下一首按钮
        me.next.on('click',function(){
            me.play.hide();
            me.pause.show();
            me.getMusice();
        });
        //风格菜单按钮
        me.style.on('click',function(){
            //判断菜单是否显示
            if(/show/g.test(me.stylecnt.attr('class'))){
                me.stylecnt.removeClass('show');
            }else{
                me.stylecnt.addClass('show');
            }

        });
        //切换音乐风格
        me.stylecnt.on('click',function(event){
            event.stopPropagation();
            var styleMhz=event.target;
            console.log($(styleMhz).attr('class'));
             me.getMusice($(styleMhz).attr('class'));

        });
        //音量控制
        me.volume.on('mouseup',function(){
            me.setVolume();
        });
        //音乐进度条滑块控制
        me.slider.on('mousedown',function(e){
            var bleft= e.pageX;
            var oldx=parseInt(me.slider.css('left'));
            $(document).on('mousemove',function(e){
                var newleft=e.pageX;
                var newx=oldx+(newleft-bleft)
                me.slider.css('left',newx)
                if(newx<0){
                    me.slider.css('left',0)
                }
                if(newx>200){
                    me.slider.css('left',200)
                }
            });
            $(document).on('mouseup',function(){
                $(document).off('mouseup');
                $(document).off('mousemove');
                me.audio[0].currentTime=me.audio[0].duration*parseInt(me.slider.css('left'))/200

            })
        })
    },
    //获取随机音乐函数
    getMusice:function(style){
        var me =this;
        if(this.clock){
             this.clock=false;
            if(style){
                styleM=style;
            }
            console.log(styleM);
            $.ajax({
                url:'http://api.jirengu.com/fm/getSong.php',
                type:'GET',
                data:{
                    channel:styleM
                },
                success:function(data){
                    var newdata=JSON.parse(data),
                        artist=newdata.song[0].artist,
                        picture=newdata.song[0].picture,
                        url=newdata.song[0].url,
                        sid=newdata.song[0].sid,
                        title=newdata.song[0].title;

                    me.audio.attr('src',url);
                    me.songCover.attr('src',picture);
                    me.song.text(title);
                    me.singer.text(artist);
                    me.audio[0].play();
                    me.playbackProgress();
                    console.log(newdata.song[0].url)
                    me.clock=true;
                }

            })
        }

    },
    //获取一次音乐风格列表
    getMusiceStyle:function(){
        var me =this;
        $.ajax({
            url:'http://api.jirengu.com/fm/getChannels.php',
            type:'get',
            success:function(data){
                var newdata=JSON.parse(data);
                newli(newdata.channels);
            }
        });
        function newli(data){
            console.log(data[0]);
            for(var key in data){
                var newLi = '<li class="'+data[key].channel_id+'">'+data[key].name+"Mhz"+'</li>';
                me.stylecnt.append(newLi);
            }
            console.log(newLi)
        }
    },
    //设置音量
    setVolume:function(){
        this.audio[0].volume=this.volume[0].value;
    },
    playbackProgress:function(){
        var me =this;
        var interval=setInterval(function(){
            var widthline = Math.round(me.audio[0].currentTime)/Math.round(me.audio[0].duration) * 100;
            me.slider.css({
                left:widthline+'%'
            });
            me.time.text(Math.floor(me.audio[0].duration/60)+':'+Math.floor(me.audio[0].duration%60)||'00:00');
            me.before.text(Math.floor(me.audio[0].currentTime/60)+':'+Math.floor(me.audio[0].currentTime%60)||'00:00');
            if(me.time.text()===me.before.text()){
                me.getMusice();
            }
        },1000)
    },

};
 var a=new Fm();
function ab(){

}

