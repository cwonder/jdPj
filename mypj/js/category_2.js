window.onload=function () {


    /****************获取要用到的节点*************/
        //列表盒子
    var tempBox=document.getElementsByClassName("jd_category_left")[0];
    var tempBoxH=tempBox.offsetHeight;
    //列表ul
    var tempUl=tempBox.children[0];
    var tempUlH=tempUl.offsetHeight;
    //列表的li
    var tempLi=tempUl.children;
    //右边部分的内容盒子
    var rightBox=document.getElementsByClassName("jd_category_right")[0];
    //声明需要用到的变量
    var startY=0,endY=0,distanceY=0,beginY=0,ceilY=0;

    /**************添加一些逻辑方法**********/
    //触摸方法
    tempBox.addEventListener("touchstart",function (e) {
        e.preventDefault();
        //记录触摸的起始坐标
        startY=e.touches[0].clientY;
    });
    tempBox.addEventListener("touchmove",function (e) {
        e.preventDefault();
        //记录最后一次滑动的坐标
        endY=e.touches[0].clientY;
        //记录滑动距离
        distanceY=endY-startY;

        //判断上下临界值
        if(beginY + distanceY>ceilY){
            beginY=ceilY-distanceY;
        }else if(-(beginY + distanceY)>(tempUlH-tempBoxH)){
            beginY=-(tempUlH-tempBoxH)-distanceY;
        }

        //做动画
        changeTransition(tempUl,0,beginY + distanceY);

    });
    tempBox.addEventListener("touchend",function (e) {
        e.preventDefault();
        //更新ul应该开始在的位置
        beginY+=distanceY;
        //重置数据
        startY=0;
        endY=0;
        distanceY=0;

    });


};