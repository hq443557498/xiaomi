$(function () {
    var $a=$("a.click-play");
    var player=document.querySelector(".video-player");
    var $play=$(".video-modal .play");
    var $pause=$(".video-modal .pause");
    var $close=$(".video-modal .close");
    var $modal=$(".modal");
    var height=$(window).height();
    var $body=$('body');
    $a.click(function(e) {
        e.preventDefault();
        var url=$(this).attr("href");
        player.src=url;
        $modal.css('display','block');
        $body.css('height',height).css("overflow","hidden");
    });
    $play.click(function () {
        player.play();
        $play.css('display','none');
        $pause.css('display','block');
    });
    $pause.click(function () {
        player.pause();
    });
    $close.click(function () {
        $modal.css('display','none');
        player.pause();
        $body.css('height','100%').css("overflow","auto");
    });
    player.onpause=function () {
        $pause.css('display','none');
        $play.css('display','block');
    };
    player.onplay=function () {
        $pause.css('display','block');
        $play.css('display','none');
    }
});