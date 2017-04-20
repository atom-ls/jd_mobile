/**
 * Created by Administrator on 2017/2/14.
 */
window.onload = function () {
del();
}

function del() {
    //获取操作对象
    var shop = document.querySelector(".jd_shop");
    var contents = document.querySelectorAll(".jd_shop_con");
    var dels = document.querySelectorAll(".jd_shop_con_details_info_delete");
    //var delups = document.querySelector(".jd_shop_con_details_info_delete span:first-child");
    var mask = document.querySelector(".ask_mask");
    var ask = mask.querySelector(".ask");
    var cancel = mask.querySelector("span:first-of-type");
    var sure = mask.querySelector("span:last-of-type");
    for(var i=0;i<dels.length;i++) {
        //记录当前点击的索引，后期有用；
        dels[i].index = i ;
        //遍历循环所有的垃圾箱，点击事件发生
        dels[i].onclick = function () {
            var delBox = this ;//确认要删除的盒子；
            //禁止屏幕滚动,直接将body设置为超出部分隐藏;
            document.body.style.overflow = "hidden";
            //mask出现
            mask.style.display = "block";
            //垃圾箱的盖子掀起
            //先获取对应的盖子
            var delup = this.querySelector("span:first-child");
            //console.log(delup);
            delup.style.transition = "all .5s";
            delup.style.transform = "rotateZ(-30deg) translateY(2px)";
            //设置ask盒子的动画效果，先在css中写好动画样式，到时候直接将类名添加到对应的元素上，或者直接在css样式里面设置就好
            //ask.classList.add("mybounceInDown");
            //点击取消，退出这个界面，同时屏幕恢复滚动
            cancel.onclick  = function () {
                delup.style.transform = "rotateZ(0deg) translateY(0px)";
                mask.style.display = "none";
                //ask.classList.remove("mybounceInDown");
                document.body.style.overflow = "auto";
            };
            //点击确认，删除对应的商品，同时屏幕恢复滚动
            sure.onclick = function () {
                delup.style.transform = "rotateZ(0deg) translateY(0px)";
                mask.style.display = "none";
                //ask.classList.remove("mybounceInDown");
                shop.removeChild(contents[delBox.index]);
                document.body.style.overflow = "auto";
            }
        };
    };
}