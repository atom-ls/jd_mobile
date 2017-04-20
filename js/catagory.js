/**
 * Created by Administrator on 2017/2/15.
 */
window.onload = function () {
    swipe();
};
function swipe() {
    //实现功能
    //1.触摸后可以上下滑动，但是需要在一定区域内（滑动区域）;
    //2.定位在一定区域内（定位区域）;
    //3.点击导航栏中的某一行时，该行的样式出现，其余行样式变为普通，并且该行的位置提到最顶上，但是如果整个导航栏底部和页面底部已经重合，那就不需要提上去；

    //获取操作的DOM对象
    var leftBox = document.querySelector(".jd_catagory_left");
    var Sidenav = leftBox.querySelector("ul");
    var Sidenavlis = Sidenav.querySelectorAll("li");
    var l_BoxHeight = leftBox.offsetHeight;
    var S_navHeight = Sidenav.offsetHeight;

    //获取定位的区域范围
    var maxPosition = 0;
    var minPosition = l_BoxHeight - S_navHeight;
    //获取滑动的区域范围
    var maxSwipe = maxPosition + 200;
    var minSwipe = minPosition - 200;
    //设置公共的过渡方法和transform效果方法
    function transition(Boolean) {
        if (Boolean) {
            Sidenav.style.transition = "all .3s";
            Sidenav.style.webkitTransition = "all .3s";
        } else {
            Sidenav.style.transition = "none";
            Sidenav.style.webkitTransition = "none";
        }
    };
    function Addtransform(distance) {
        Sidenav.style.transform = "translateY(" + distance + "px)";
        Sidenav.style.webkitTransform = "translateY(" + distance + "px)";
    }


    //设置系列的touch事件
    //设置初始值
    var startY = 0;
    var moveY = 0;
    var distance = 0;
    var isMove = false;
    var currentY = 0;

    //设置touchstart事件
    Sidenav.addEventListener("touchstart", function (e) {
        startY = e.touches[0].clientY;
    });
    //设置touchmove事件
    Sidenav.addEventListener("touchmove", function (e) {
        isMove = true;
        moveY = e.touches[0].clientY;
        distance = moveY - startY;
        //取消过渡的效果；
        transition(false);
        //设置位置的移动，首先进行判断是否超过了滑动的区域；
        if (currentY + distance > minSwipe && currentY + distance < maxSwipe) {
            Addtransform(currentY + distance);
        }
        ;
    });
    //设置touchend事件
    window.addEventListener("touchend", function (e) {
        //设置移动过后的定位效果，需要判断是否在定位区域内，如果在区域范围内，那就正常定位
        //如果超过，那就按照定位的最大最小值去定位;
        if (currentY + distance > maxPosition) {
            currentY = maxPosition;
            transition(true);
            Addtransform(currentY);
        } else if (currentY + distance < minPosition) {
            currentY = minPosition;
            transition(true);
            Addtransform(currentY);
        } else {
            currentY = currentY + distance;
        }
        ;
        //恢复初始值
        startY = 0;
        moveY = 0;
        distance = 0;
        isMove = false;//在这里好像没有什么用；
    });
    //设置点击事件；自己封装一个tap点击事件;
    window.itcast = {};
    itcast.tap = function (obj, callback) {
        if (obj && typeof obj == "object") {
            var startTime = 0;
            var Move = false;
            //记录touchstart的时间点;
            obj.addEventListener("touchstart", function () {
                startTime = Date.now();
            });
            //记录是否进入touchmove事件；
            obj.addEventListener("touchmove", function () {
                Move = true;
            });
            window.addEventListener("touchend", function (e) {
                //如果没有移动，并且点击的时间差小于150毫秒;
                if (!Move && (Date.now() - startTime) < 150) {
                    callback && callback(e);
                };
                //重新归0；不然移动后就无法再次点击，因为进入条件判断后，不成立
                Move = false ;
                startTime = 0 ;
            });
        } else {
            alert("error");
        }
    };
    var tapdistanceY ; //设置点击位置的距离；
    itcast.tap(Sidenav, function (e) {
        //记录点击的对象,此处点击的对象是li标签中的a标签;
        var tapLi = e.target.parentNode;//获得的是li标签，因为需要给li标签和其下的a标签设置样式;
        //先在外面获取所有的li标签对象，再利用排他思想;
        for (var i = 0; i < Sidenavlis.length; i++) {
            Sidenavlis[i].index = i ;//记录每个li对应的索引，后期的移动有需要;
            Sidenavlis[i].classList.remove("now");
        };
        tapLi.classList.add("now");
        //判断点击的位置，如果点击位置的距离大于最小的定位距离，那么点击位置就移动到最顶上，反之整个ul移动到最小定位距离；
        tapdistanceY = -tapLi.index*50;//应当为负值；
        if(tapdistanceY>minPosition) {
            currentY = tapdistanceY;//将这个值赋值给每次移动的距离;
            transition(true);
            Addtransform(currentY);
        } else {
            currentY = minPosition ;
            transition(true);
            Addtransform(currentY);
        };
    });


}