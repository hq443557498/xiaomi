$("header").load("header.html",function () {
    function isLogin() {
        var uname=sessionStorage.getItem('uname');
        var uid=sessionStorage.getItem('uid');
        if(uname!=null){
            var html=`<li><a href="user_center.html">欢迎会员${uname}登录</a></li>
                   <li><a href="javascript:void(0);" class="logOut">退出登录</a></li>
                   <li><a href="javascript:void(0);">消息通知</a></li>
`;
            $('.login_reg_module').html(html);
            $.ajax({
                url:'/public_nav/header_cart',
                type:'post',
                data:{uid:uid},
                success:function (data) {
                    if(data.length!=0){
                        var html="";
                        $.each(data,function (i) {
                            html+=`<li>
                        <a href="details.html" class="imgs"><img src="img/${data[i].img_s}" alt=""></a>
                        <a href="details.html" class="title">
                            ${data[i].name}&nbsp;${data[i].mname}&nbsp;${data[i].cname}
                        </a>
                        <div class="total">
                            <span class="price">${data[i].price}元x${data[i].num}</span>
                        </div>
                    </li>`
                        });
                        $('.top_cart_menu_list').html(html);
                        $('.top_cart_menu .text').css('display','none');
                    }else {
                        $('.top_cart_menu .text').css('display','block');
                    }
                }
            });
            $("header").on('click','.logOut',function () {
                sessionStorage.removeItem('uname');
                sessionStorage.removeItem('uid');
                var html=`<li><a href="login.html">登录</a></li>
            <li><a href="register.html">注册</a></li>
            <li><a href="javascript:void(0);">消息通知</a></li>`;
                $('.login_reg_module').html(html);
                // $('.top_cart_menu_list').html("");
                // $('.top_cart_menu .text').css('display','block');
            })
        }else {
            $('.top_cart_menu_list').html("");
            $('.top_cart_menu .text').css('display','block');
        }
    }
    isLogin();
    $("header").on('mouseenter','.top_shopping_car',function () {
        isLogin()
    })

});
$("footer").load("footer.html");
$(".public-nav").load("public-nav.html");
//搜索获取焦点事件
$(".public-nav").on('focus','.search',function () {
    $(".search-hot-words").addClass("hide");
    $(".search,.search-btn").addClass("active");
    $(".search-list").css("display","block");
});
//失去焦点
$(".public-nav").on('blur','.search',function () {
    $(".search-hot-words").removeClass("hide");
    $(".search,.search-btn").removeClass("active");
    setTimeout(function(){$(".search-list").css("display","none")},200);
});
//搜索功能的实现
$(".public-nav").on('keyup','.search',function () {
    var kw=$(".search").val();
        $.ajax({
            url:'/index/search?kw='+kw,
            success:function (data) {
                console.log(data);
                if(data.length!=0) {
                    var html = '';
                    $(data).each(function (i) {
                        html += `
                <li><a href="details.html">${data[i].name}</a></li>
                `;
                    });
                }else{
                    html=`<li>未找到该商品！</li>`;
                }
                $('.search-list-kw').html(html);
            }
        });
});
//鼠标移入列显示出导航详情，并添加active
//鼠标移入发送ajax请求
$(function () {
    var lists=[];
    $(".public-nav").on('mouseenter','#nav_bar_list li',function (e) {
        var index=$(this).val();
        //服务和社区列除外
        if(index!=0) {
            e.preventDefault();
            $(this).children().addClass("active");
            $(".nav_details").css('height', '230px');
            var html = "";
            //ajax请求导航详情列表并防止重复请求；
            if(lists[index]==null) {
                $.ajax({
                    url: '/index/list?type=' + index,
                    success: function (data) {
                        lists[index] = data;
                        $(lists[index]).each(function (i) {
                            var list = lists[index][i];
                            html +=
                                `
                        <li>
                        <a href="${list.pid}" name="${list.pid}">
                        <img src="img/${list.img_m}">
                        <p>${list.name}</p>
                        </a>
                        <p class="price">${list.price}起</p>
                    <span>${list.state == 1 ? '新品' : list.state == 2 ? '现货' : list.state == 3 ? '热卖' : '包邮'}</span>
                    </li>
                        `;
                        });
                        $(".nav_list_details").html(html);
                    }
                })
            }else{
                $(lists[index]).each(function (i) {
                    var list = lists[index][i];
                    html +=
                        `
                        <li>
                        <a href="${list.pid}" name="${list.pid}">
                        <img src="img/${list.img_m}">
                        <p>${list.name}</p>
                        </a>
                        <p class="price">${list.price}起</p>
                    <span>${list.state == 1 ? '新品' : list.state == 2 ? '现货' : list.state == 3 ? '热卖' : '优惠'}</span>
                    </li>
                        `;
                });
                $(".nav_list_details").html(html);
            }
            $(".nav_details").css('border-top','1px solid #E0E0E0');
        }else{
            $(".nav_details").css('height','0px');
            $(".nav_details").css('border-top','1px solid transparent');
        }
    });
});
//鼠标移出去掉active
$(".public-nav").on('mouseleave','#nav_bar_list li',function (e) {
        e.preventDefault();
        $(this).children().removeClass("active");
});
//鼠标移除导航详情模块隐藏自己
$(".public-nav").on('mouseleave',".nav_details",function (e) {
    $(this).css('height','0px');
    $(".nav_details").css('border-top','1px solid transparent');
});
//鼠标移除导航列表隐藏导航详情模
$(".public-nav").on('mouseleave','#nav_bar_list',function () {
    $(".nav_details").css('height','0px');
    $(".nav_details").css('border-top','1px solid transparent');
});
// 鼠标移入导航详情模块显示自己
$(".public-nav").on('mouseenter','.nav_details',function (e) {
    $(this).css('height','230px');
    $(".nav_details").css('border-top','1px solid #E0E0E0');
});
$('.public-nav').on('click','.nav_list_details a',function (e) {
    e.preventDefault();
    var pid=$(this).attr('href');
    if(pid>6){
        pid=5;
    }
    sessionStorage.setItem("pid",pid);
    location.href="details.html";
});
