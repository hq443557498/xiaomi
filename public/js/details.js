//详情页轮播
$(function () {
    var $list=$(".photospic-list");
    const OFFSET=1067;
    var index=0;
    var timer=setInterval(function () {
        index++;
        silde();
    },3000);
    function silde() {
        if(!$list.is(":animated")){
        $list.animate({
            'left':-1983-index*OFFSET+"px"
        },function () {
            if(index>=7){
                index=0;
                $list.css('left',-1983-index*OFFSET+"px");
            }else if(index<=-1){
                index=6;
                $list.css('left',-1983-index*OFFSET+"px");
            }
        })
    }}
    $(".section-photos .next").click(function (e) {
        e.preventDefault();
        index++;
        silde();
    });
    $(".section-photos .prev").click(function (e) {
        e.preventDefault();
        index--;
        silde();
    });
    $(".section-photos a").hover(function () {
        clearInterval(timer);
    },function () {
        timer=setInterval(function () {
            index++;
            silde();
        },3000);
    })
});
//手机颜色切换
$(function () {
    var $lisNums=$(".list-num li");
    var $imgs=$(".list-img li");
    var $texts=$(".list-text li");
    $lisNums.click(function () {
        var n=$lisNums.index(this);
        $lisNums.eq(n).addClass('active').siblings().removeClass('active');
        $imgs.eq(n).addClass('active').siblings().removeClass('active');
        $texts.eq(n).addClass('active').siblings().removeClass('active');
    })
});
//导航固定定位
$(window).scroll(function() {
    var b = $(window).scrollTop();
    if(b>200){
        $('.details-nav').css({
            'position':'fixed',
            top:0
        }).addClass("animated slideInDown");
    }else {
        $('.details-nav').css({
            'position':'relative'
        }).removeClass("animated slideInDown");
    }
});


