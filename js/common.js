/**
 * Created by Administrator on 2017/2/13.
 */
//封装一些公共方法，创建一个对象，对对象设置一些方法，到时候可以通过调用改对象的方法实现效果；
window.itcast = {};
itcast.transitionEnd = function (obj,callback) {
    if(obj&&typeof obj == "object") {
        obj.addEventListener("transitionend", function () {
            callback&&callback();//短路操作
        });
        obj.addEventListener("webkitTransitionEnd", function () {
            callback&&callback();
        });
    } else {
        alert("Erorr");
    }
}

itcast.transitionEnd2 = function (obj,callback) {
    if(obj&&typeof obj == "object") {
        obj.addEventListener("transitionend", function () {
            callback&&callback();
        });
        obj.addEventListener("webkitTransitionEnd", function () {
            callback&callback();
        });
    } else {
        alert("error");
    }
};
itcast.tap = function (obj,callback) {
    if(obj&&typeof obj =="object") {
        var isMove = false ;
        var start =0 ;
        //设置触摸事件
        obj.addEventListener("touchstart", function (e) {
            start = Date.now() ;
        });
        obj.addEventListener("touchmove", function (e) {
            isMove = true ;
        });
        obj.addEventListener("touchend", function (e) {
            //判断条件，触摸后没有滑动，并且滑动的时间少于150毫秒，即算做tap事件；
            if(!isMove&&(Date.now()-start<150)){
                callback&&callback(e);
            };
            isMove = false ;
            start = 0 ;
        });
    } else {
        alert("error");
    };
};




















