charset = "UTF-8";

window.jd={}

//过渡结束后执行回调函数
var transitionEnd = function (obj, callBack) {
    if (typeof obj !== "object") return;
    obj.addEventListener('transitionEnd', function(e){
        callBack && callBack(e);
    });
    obj.addEventListener('webkitTransitionEnd', function(e){
        callBack && callBack(e);
    });
};

//做动画的三个方法
var addTransition = function (obj) {
    obj.style.transition = "all .2s ease";
    obj.style.webkitTransition = "all .2s ease";
};
var removeTransition = function (obj) {
    obj.style.transition = "none";
    obj.style.webkitTransition = "none";
};
var changeTransition = function (obj, numX,numY) {
    obj.style.transform = "translate(" + numX + "px)";
    obj.style.webkitTransform = "translate(" + numX + "px)";
    obj.style.transform = "translateY(" + numY + "px)";
    obj.style.webkitTransform = "translateY(" + numY + "px)";
};


//自动触发事件的方法
var triggle = function(element, method) {
    return element[method]();
};


//自定义点击方法
jd.tab =function (obj,fn) {
    if(typeof obj!=="object") return;
    //一个方法,点击一定时间后松开,且没移动
    var time=0,flag=false;
    obj.addEventListener("touchstart",function () {
        time=new Date().getTime();
        flag=true;
    });
    obj.addEventListener("touchmove",function () {
        flag=false;
    });
    obj.addEventListener("touchend",function (e) {
        if(new Date().getTime()-time>50&&flag){
            fn(e);
        };
        time=0;
    });
};

