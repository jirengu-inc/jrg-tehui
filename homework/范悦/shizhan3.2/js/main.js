/**
 * Created by Administrator on 2016/10/22.
 */

require.config({
    baseUrl:'js/app',

    paths:{
        'jquery':"../lib/jquery"
    }
});

require(['jquery','full','gotop','waterfall','lazyload'],function($,full,gotop,fall,lazy){
   full.init($('#full-carousel .ct'));
    gotop._gotop();
    fall._waterfall();
    new lazy.lazy($('#about'))
});