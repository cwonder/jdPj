charset = "UTF-8";

window.onload = function () {
    /********声明变量*******/
    var startX=0,endX=0,distanceX=0;
    /***********************获取节点**************/
    //获取轮播图box
    var scrollBox = document.getElementsByClassName("jd_scrollBox");
    //获取轮播图图片ul
    var imgUl = scrollBox[0].children[0];
    //获取轮播图图片ul里li的数量
    var liCount = imgUl.children.length;
    //获取轮播图图片ul里li的宽度
    var liW = imgUl.children[0].offsetWidth;
    // 获取轮播图按钮的ul
    var scrollBtnUl = scrollBox[0].children[1];
    //获取轮播图全部按钮li
    var scrollBtn = scrollBtnUl.children[0];
    // 获取固定定位的开部
    var searchTop = document.getElementsByClassName("jd_header")[0].children[0];
    //获取轮播图box高度
    var scrollBoxH = imgUl.offsetHeight;
    //获取倒计时的span
    var timeSpam=document.getElementsByClassName("time_num");
    /**********************逻辑方法*********************/
    //一、轮播图做动画

    var imgScroll = function () {
        var index = 1;
            //轮播图动画
        var imgPlay=function () {
                index++;
                addTransition(imgUl);
                changeTransition(imgUl, -index * liW);
            };
        var circleScroll = setInterval(imgPlay, 1000);


        //轮播图临界值更新//每次滚动结束之后,更新按钮的选中
        transitionEnd(imgUl, function () {
            if (index >= (liCount - 1)) {
                index = 1;
            } else if (index <= 0) {
                index = liCount - 2;
            }
            // 4.1 清除过渡
            removeTransition(imgUl);
            changeTransition(imgUl, -index * liW);
            imgBtn(index);
        });
        //遍历轮播图按钮设置点击选中样式
        for (var i = 0; i <= liCount - 3; i++) {
            scrollBtn.children[i].addEventListener("touchstart",
                function () {
                index = this.index + 1;
                changeTransition(imgUl, -index * liW);
                for (var j = 0; j <= liCount - 3; j++) {
                    scrollBtn.children[j].className = "";
                }
                scrollBtn.children[index - 1].className = "current";
            })
        }

        //监听触摸滑动→触摸三事件
        imgUl.addEventListener("touchstart",function (e) {
            e.preventDefault();
            clearInterval(circleScroll);
            startX=e.touches[0].clientX;
        });
        imgUl.addEventListener("touchmove",function (e) {
            e.preventDefault();
            endX=e.touches[0].clientX;
            distanceX=endX-startX;
            removeTransition(imgUl);
            changeTransition(imgUl,-index * liW+distanceX);
        });
        imgUl.addEventListener("touchend",function (e) {

            if(distanceX>liW/3) {
                if(distanceX>0){
                    index--;
                }
            }else if(distanceX<liW/3){
                if(distanceX<0){
                    index++;
                }
            }
            addTransition(imgUl);
            changeTransition(imgUl,-index * liW);
            circleScroll=setInterval(imgPlay,1000);
            //重置数据
            startX=0;
            endX=0;
            distanceX=0;
        });
    };
    //轮播图按钮滚动
    var imgBtn = function (index) {
        index -= 1;
        if (index >= liCount - 2) return;
        for (var i = 0; i <= liCount - 3; i++) {
            scrollBtn.children[i].index = i;
            scrollBtn.children[i].className = "";
        }
        scrollBtn.children[index].className = "current";
    };
    //固定开头变色
    var changeSearch = function () {

        window.onscroll = function () {
            //页面滚动距离

            var htmlScrollT = Math.round(document.documentElement.scrollTop);
            var opt;
            if (htmlScrollT <= scrollBoxH) {
                opt = htmlScrollT / scrollBoxH * .85;
            } else {
                opt = .85;
            }
            searchTop.style.background = "rgba(201, 21, 35," + opt + ")";
        };
    };
    //倒计时
    var countDown=function () {
        var allTime=8*60*60;
        var timer=setInterval(function () {
            allTime--;
            if(allTime<=0) {
                clearInterval(timer);
            }
            var h=Math.floor(allTime/60/60);
            var m=Math.floor(allTime/60%60);
            var s =Math.floor(allTime%60);
            timeSpam[0].innerHTML=h>10?Math.floor(h/10):0;
            timeSpam[1].innerHTML=h%10;
            timeSpam[2].innerHTML=m>10?Math.floor(m/10):0;
            timeSpam[3].innerHTML=m%10;
            timeSpam[4].innerHTML=s>10?Math.floor(s/10):0;
            timeSpam[5].innerHTML=s%10;
        },1000)
    };



    /*****************调用方法**********************/
    //一、滚动的时候改变标题头颜色
    changeSearch();
    //自动触发一次滚动
    triggle(window, "onscroll");
    //二、执行轮播图
    imgScroll();
    //三、执行倒计时
    countDown();



};





