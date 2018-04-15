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
    var startY=0,endY=0,distanceY=0,beginY=0,ceilY=0,parameter
    =80;

    /**************添加一些逻辑方法**********/
    //滑动的触摸方法
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
        //向上滑动
        // console.log(beginY - distanceY);

        if((beginY + distanceY)>(ceilY)&&distanceY>0){
            //1.小于ceilY的时候,做的动画目标Y等于ceilY
            //2.起始位置-移动距离
            beginY =ceilY;
            if((beginY + distanceY)>(ceilY+parameter)) {
                distanceY =parameter;
            }

        }else if((beginY+distanceY)<=-(tempUlH-tempBoxH)){
            addTransition(tempUl);

            beginY =-(tempUlH-tempBoxH);
            if((beginY + distanceY)<(tempUlH-tempBoxH)) {
                //大于临界值的时候,如果移动的距离大于参数,就等于参数
                if(distanceY<=-parameter) distanceY =-parameter;
            }
        }
        //做动画
        removeTransition(tempUl);
        changeTransition(tempUl,0,beginY + distanceY);
    });
    tempBox.addEventListener("touchend",function (e) {
        e.preventDefault();
        //1.
        addTransition(tempUl);
        if((beginY + distanceY)>=ceilY){
            changeTransition(tempUl,0,ceilY);
        }else if((beginY+distanceY)<=-(tempUlH-tempBoxH)){
            changeTransition(tempUl,0,-(tempUlH-tempBoxH));
        }else {
            beginY+=distanceY;
        }
        //重置数据
        startY=0;
        endY=0;
        distanceY=0;

    });

    //点击li切换选中方法
    var onChangeBtn=function () {
        for(var i = 0; i < tempLi.length; i++){
            tempLi[i].index=i;
            var index=tempLi[i].index;
            //调用方法,如果是点击意向操作,就选中this的li
            tab(tempLi[i],function (e) {
                for(var j = 0; j < tempLi.length; j++){
                    tempLi[j].className="";
                }
                var thisLi=e.target.parentNode;
                var distanceY=-thisLi.index*thisLi.offsetHeight;
                thisLi.className="current";
                addTransition(tempUl);
                //判断,何时需要this置顶
                if(distanceY<=-550){
                   changeTransition(tempUl,0,-550);
                }else if(distanceY<0)changeTransition(tempUl,0,distanceY);

                //点击li,右边内容会消失再出来
                addTransition(rightBox);
                rightBox.style.opacity="0";
                var temp=setTimeout(function () {
                    rightBox.style.opacity="1";
                    clearTimeout(temp);
                },200)
            });
        }
    };


    onChangeBtn();


};