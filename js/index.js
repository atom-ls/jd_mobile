/**
 * Created by Administrator on 2017/2/13.
 */
window.onload = function(){
    search();
    banner();
    downtime();
}
//设置search的透明度变化
function search(){
    //获取操作对象
    var jd_header  =document.querySelector(".jd_header");
    var banner = document.querySelector(".jd_banner");
    var height = banner.offsetHeight;
    var  opacity = 0;
    //屏幕滚动时，获取卷曲部分的高度top，比较banner的高度，如果top>height,那么透明度固定，反之透明度逐渐增加；
    window.onscroll = function () {
        var top = document.body.scrollTop;
        if(top>height ) {
            opacity = 0.85;
        } else {
            opacity = 0.85*top/height;
        };
        jd_header.style.background = "rgba(201,21,35,"+opacity+") ";
    };
}

//设置轮播图
function banner() {
    //自动无缝滚动；
    //手指触摸时滑动；滑动距离超过屏幕三分之一，那么就滚动到对应的屏幕，否则吸附回来

    //获取对象
    var banner = document.querySelector(".jd_banner");
    var width = banner.offsetWidth;
    var imgBox = document.querySelector("ul:first-child");
    var imgs = imgBox.querySelectorAll("img");
    var pointBox = document.querySelector("ul:last-child");
    var  points =pointBox.querySelectorAll("li");
    var  timer = null ;
    var index = 1 ;
    //设置自动无缝滚动；利用Css3的新属性transition和transform
    timer = setInterval(function () {
        index++;
        TransitionListener(true);
        AddTransform(-index*width);
    },1000);
    //设置transitionend监听事件，当滚动到9或者0的时候，自动跳转到第2个或者是8
    //imgBox.addEventListener("transitionend", function () {
    //    if(index>=9){
    //        index=1;
    //    };
    //    if(index<=0){
    //        index = 8;
    //    };
    //    TransitionListener(false);
    //    AddTransform(-index*width);
    //});
    itcast.transitionEnd2(imgBox, function () {
        if(index>=9){
                    index=1;
                };
                if(index<=0){
                    index = 8;
                };
                TransitionListener(false);
                AddTransform(-index*width);
                setpoint();
    });
    //设置下面的圆点跟着图片一起移动
    function setpoint() {
        for(var i=0 ;i<points.length;i++){
            points[i].classList.remove ("current");
        } ;
        points[index-1].classList.add("current");
    };


    //设置触摸时候的事件
    //设置一些基本的值
    var startX = 0 ;
    var MoveX = 0 ;
    var distance = 0 ;
    var isMove = false ;
    //设置touchstart事件;
    imgBox.addEventListener("touchstart", function (e) {
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });
    imgBox.addEventListener("touchmove", function (e) {
        isMove = true ;
        moveX = e.touches[0].clientX;
        distance = moveX - startX;
        AddTransform(-index*width+distance);
    });
    //谷歌浏览器设置touchend时，会遗漏touchend事件，通过直接设置window来解决这个问题
    window.addEventListener("touchend", function () {
        //判断移动的距离是否移动到了三分之一
        if(Math.abs(distance)>width/3){
            if(distance>0){
                index--;
            } else {
                index++;
            };
            TransitionListener(true);
            AddTransform(-index*width);
        } else {
            TransitionListener(true);
            AddTransform(-index*width);
        };
        //谨慎起见，touchend后所有数值归0
        startX = 0;
        MoveX = 0;
        distance =0 ;
        isMove = false ;
        //防止万一，再清一遍定时器
        clearInterval(timer);
        //重新设置定时器
        timer = setInterval(function () {
            index++;
            TransitionListener(true);
            AddTransform(-index*width);
        },1000);
    });

    //封装公共的一些方法
    function TransitionListener(Boolean) {
        if(Boolean) {
            imgBox.style.transition = "all .2s";
            imgBox.style.webkitTransition = "all .2s";
        } else {
            imgBox.style.transition = "none";
            imgBox.style.webkitTransition = "none";
        };
    };
    function AddTransform(distance) {
        imgBox.style.transform = "translateX("+distance+"px)"
    }
}

//设置倒计时
function downtime() {
    //设置倒计时的时间
    var time = 5*60*60;
    var timer = null ;
    timer = setInterval(function () {
        if(time<0){
            clearInterval(timer);
        } else {
            var h = Math.floor(time/3600);
            var m = Math.floor((time%3600)/60);
            var s = Math.floor(time%60);
            var skTime = document.querySelector(".sk-time");
            var spans = skTime.querySelectorAll("span");
            time--;
            spans[0].innerHTML = Math.floor(h/10);
            spans[1].innerHTML = Math.floor(h%10);
            spans[3].innerHTML = Math.floor(m/10);
            spans[4].innerHTML = Math.floor(m%10);
            spans[6].innerHTML = Math.floor(s/10);
            spans[7].innerHTML = Math.floor(s%10);
        };
    },1000)
}