
window.onload=function () {
    /*获取所有可以打钩的a*/
    var oCheck=document.getElementsByClassName("checked");

    /*获取垃圾桶图标*/
    var deleteBox=document.getElementsByClassName("jd_buyTemp_con_right_delete");
    var mask=document.getElementsByClassName("mask")[0];
    var close=document.getElementsByClassName("close")[0];
    console.log(close);
    var up;
    for(var i = 0; i < deleteBox.length; i++){
        (function (index) {
            //点击垃圾桶翻盖
            jd.tab(deleteBox[index],function (e) {
                up=deleteBox[index].firstElementChild;
                up.style.transform="rotate(-45deg)";
                up.transformorigin="3px 7px";
                deleteBox[index].firstElementChild.className="up clickDelete";
                mask.style.display="block";
            });
        })(i);

    }

    jd.tab(close,function (e) {
        mask.style.display="none";
        up.style.transform="none";
    });



    /*切换选中状态*/
    for(var i = 0; i < oCheck.length; i++){
        (function (index) {
            oCheck[index].addEventListener("click",function (e) {
                if(oCheck[index].hasAttribute("checked")){
                    oCheck[index].removeAttribute("checked")
                }else{
                    oCheck[index].setAttribute("checked","")
                }

            })
        })(i);
    }

};