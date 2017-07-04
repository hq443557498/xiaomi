$("header").load("header.html",function () {
    var uname=sessionStorage.getItem('uname');
    if(uname!=null){
        var html=`<a href="#">欢迎会员${uname}登录</a>`;
        $('.login_reg_module li').eq(0).html(html);
        $('.login_reg_module li').eq(1).remove();
    }});
$("footer").load("footer.html");
$(".public-nav").load("public-nav.html");
//主轮播
$(function () {
        var $imgs=$("#silder-top li");
        var $nums=$("#slider-num a")
        var index=0;
        var timer=setInterval(function () {
            index++;
            silderTop();
        },3000);
//轮换操作
        function silderTop() {
            index>=6&&(index=0);
            index<=-1&&(index=5);
            $imgs.eq(index).addClass("active").siblings().removeClass("active");
            $nums.eq(index).addClass("active").parent().siblings().children().removeClass("active");
        }
        $("a.silder-top-prev").click(function (e) {
            e.preventDefault();
            index--;
            silderTop();
        });
        $("a.silder-top-next").click(function (e) {
            e.preventDefault();
            index++;
            silderTop();
        });
        $("#silder-top").hover(function () {
            clearInterval(timer);
            timer=0;
        },function () {
            timer=setInterval(function () {
                index++;
                silderTop();
            },3000);
        });
        $nums.click(function (e) {
                e.preventDefault();
                index=$nums.index(this);
                silderTop();
            }
        );

    });

//导航详情模块
$(function () {
    //给轮播上的列表的每一列绑定鼠标移入事件
    $('#slider-nav-list li').mouseenter(function () {
        $('.slider-nav-list-details').css('display','block');
    });
    //给轮播上的列表绑定鼠标移除事件
    $('#slider-nav-list').mouseleave(function () {
        $('.slider-nav-list-details').css('display','none');
    });
    //列表详情移入事件
    $('.slider-nav-list-details').mouseenter(function () {
        $(this).css('display','block');
    });
    //列表详情移除事件
    $('.slider-nav-list-details').mouseleave(function () {
        $(this).css('display','none');
    });
});


//明星产品轮播
$(function () {
    var $ul=$(".J_homeStar_silder ul");
    const OFFSET=-1226;
    var timer=setInterval(silder(),5000);
    $("#J_homeStar>a").click(function (e) {
        e.preventDefault();
        silder();
    });
    function silder() {
        if(parseInt($ul.css('left'))>OFFSET){
            $ul.css('left',OFFSET+"px")
        }else{
            $ul.css('left',0);
        };
    }
});
<!--轮播上的列表-->
$(function () {
    var $lis = $('#slider-nav-list li');
    var lists = [];
    $lis.mouseenter(function () {
        var str = $(this).attr('name');
        var index = $(this).index();
        var html = "";
        if (str != null) {
            if (lists[index] == null) {
                $.ajax({
                    url: '/index/nav?str=' + str,
                    success: function (data) {
                        lists[index] = data;
                        $(data).each(function (i) {
                            html += `<li>
                <a href="details.html"><img src="img/${data[i].img_s}">
                </a>
                <a href="details.html" class="text">${data[i].name}</a>
            </li>`;
                            var n=Math.ceil(data.length/6);
                            $('.slider-nav-list-details').css('width',245*n+'px');
                        });
                        $('.slider-nav-list-details').html(html);
                    }
                });
            } else {
                    var n = Math.ceil(lists[index].length / 6);
                    $('.slider-nav-list-details').css('width', 245 * n + 'px');
                    $(lists[index]).each(function (i) {
                        html += `<li>
                <a href="details.html"><img src="img/${lists[index][i].img_s}"></a><a href="details.html" class="text">${lists[index][i].name}</a>
            </li>`;
                    });
                    $('.slider-nav-list-details').html(html);

            }
        }else {
            $('.slider-nav-list-details').css('display','none');
        }
    });
});
//楼层
$(function () {
    var $headerLis=$('.floor-header li');
    $headerLis.eq(0).addClass('active').siblings('li').removeClass('active');
    var str=$('.floor-header li.active').attr('name');
    indexCart(str);
    $headerLis.mouseenter(function () {
        $(this).addClass('active').siblings('li').removeClass('active');
        var str=$(this).attr('name');
        // $.ajax({
        //     url:'/index/floor?str='+str,
        //     success:function (data) {
        //         var html="";
        //         for(var i=0;i<7;i++){
        //             html+=`<li>
        //             <h3>
        //                 <a href="details.js">
        //                     <img src="img/${data[i].img_m}" alt="">
        //                     <p>${data[i].name}</p>
        //                 </a>
        //             </h3>
        //             <p class="desc">${data[i].title}</p>
        //             <p class="price"><span>${data[i].price}</span>元<s></s></p>
        //             <div>
        //                 <a href="#">
        //                     ${data[i].detail}
        //                 </a>
        //             </div>
        //         </li>`
        //         }
        //         html+=`<li>
        //             <h1>浏览更多</h1>
        //             <p>热门</p>
        //             <img src="img/more.png" alt="" style="width: 80px;height: 80px">
        //         </li>`;
        //         $('.floor-details-list').html(html);
        //     }
        // })
        indexCart(str);
    });
    function indexCart(str) {
        $.ajax({
            url:'/index/floor?str='+str,
            success:function (data) {
                var html="";
                for(var i=0;i<7;i++){
                    html+=`<li>
                    <h3>
                        <a href="details.js">
                            <img src="img/${data[i].img_m}" alt="">
                            <p>${data[i].name}</p>
                        </a>
                    </h3>
                    <p class="desc">${data[i].title}</p>
                    <p class="price"><span>${data[i].price}</span>元<s></s></p>
                    <div>
                        <a href="#">
                            ${data[i].detail}
                        </a>
                    </div>
                </li>`
                }
                html+=`<li>
                    <h1>浏览更多</h1>
                    <p>热门</p>
                    <img src="img/more.png" alt="" style="width: 80px;height: 80px">
                </li>`;
                $('.floor-details-list').html(html);
            }
        })
    }
})