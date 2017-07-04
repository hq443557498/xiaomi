
// 轮播逻辑函数
function sildermodule() {
    var $lis = $('.shopping_img_silder li');
    var $as = $('.slider_num a');
    var size = $lis.size();
    if (size > 1) {
        var index = 0;
        $lis.eq(index).addClass('active');
        $as.eq(index).addClass('active');
        function silder() {
            index >= size && (index = 0);
            index <= -1 && (index = size - 1);
            $lis.eq(index).addClass("active").siblings().removeClass('active');
            $as.eq(index).addClass("active").parent().siblings().children().removeClass('active');
        }

        var timer = setInterval(function () {
            index++;
            silder();
        }, 3000);
        $('.slider_operation .next').click(function () {
            index--;
            silder();
        });
        $('.slider_operation .prev').click(function () {
            index++;
            silder();
        });
        $('.slider_num').on('click', 'li', function () {
            index = $(this).index();
            silder();
        });
        $('.details_shopping_img').hover(function () {
            clearInterval(timer);
            timer = null;
        }, function () {
            timer = setInterval(function () {
                index++;
                silder();
            }, 3000);
        });
    } else {
        $('.slider_operation').css('display', 'none');
        $('.slider_num').css('display', 'none');
        $lis.eq(0).addClass('active');
    }
};
//动态加载数据并绑定事件
$(function () {
    var pid=sessionStorage.getItem('pid');
    //选择颜色后动态加载相应的轮播图片等相关信息
    function imgModel(result,index) {
        var imgHtml="";
        var numHtml="";
        var data=result[index];
        // 分割出的图片地址
        var imgs=data.img_l.split(",");
        //遍历添加显示内容
        $(imgs).each(function (i) {
            imgHtml += `<li><img src="img/${imgs[i]}" alt=""></li>`;
            numHtml += `<li><a href="javascript:void (0)"></a></li>`;
        });
        $('.shopping_img_silder').html(imgHtml);
        $('.slider_num').html(numHtml);
        $('.details_shopping_module h2').html(result[index].name);
        $('.details_shopping_module .title').html('【'+result[index].title+'】');
        $('.details_shopping_module .f-title').html(result[index].detail);
        $('.shopping_bar h2').html(result[index].name);
        $('.choose span').eq(0).html(result[index].name);
        $('.choose span').eq(2).html(result[index].cname);
        sildermodule();
    }
    //动态加载版本相关信息
    var modeldata="";
    function detailModel(cid,index) {
        $.ajax({
            url:'/detail/model?cid='+cid,
            success:function (data) {
                modeldata=data;
                var modelHtml="";
                $.each(data,function (i) {
                    modelHtml+=`<li value="${data[i].mid}"><a href="javascript:void (0)"><span>${data[i].mname} </span><span>${data[i].price}元</span></a></li>`
                });
                $('.module').html(modelHtml);
                $('.module a').eq(0).addClass("active");
                $('.details_shopping_module .p-price span').html(data[index].price);
                $('.choose span').eq(1).html(data[index].mname);
                $('.choose span').eq(3).html(data[index].price);
                $('.total').html(data[index].price);
            }
        })
    }
    // 默认打开网页先加载颜色数据和默认选择数据中的第一个显示
    $.ajax({
        url:'/detail/product?pid='+pid,
        success:function (result) {
            var index=0;
            imgModel(result,index);

            //动态加载颜色按钮默认选择第一个
            var colorHtml="";
            $(result).each(function (i) {
                colorHtml+=`<li value="${result[i].cid}"><a href="javascript:void (0)">${result[i].cname}</a></li>`
            })
            $('.color-list').html(colorHtml);
            $('.color-list a').eq(0).addClass("active");
            var cid=result[0].cid;
            detailModel(cid,0);
            // 给颜色按钮绑定事件
            $('.color-list').on('click','a',function () {
                var cid=$(this).parent().val();
                var index=$(this).parent().index();
                detailModel(cid,0);
                $(this).addClass('active').parent().siblings().children().removeClass('active');
                imgModel(result,index);
            });
            $('.module').on('click','a',function () {
                $(this).addClass('active').parent().siblings().children().removeClass('active');
                var index=$(this).parent().index();
                $('.details_shopping_module .p-price span').html(modeldata[index].price);
                $('.choose span').eq(1).html(modeldata[index].mname);
                $('.choose span').eq(3).html(modeldata[index].price);
                $('.total').html(modeldata[index].price);
            });
            //添加购物车
            $('.add-btn').click(function () {
                var mid=$('.module a.active').parent().val();
                console.log(mid);
                var uid=sessionStorage.getItem('uid');
                if(uid==null){
                    location.href='login.html';
                }else{
                    $.ajax({
                        url:'/shopping_cart/insert',
                        type:'post',
                        data:{mid:mid,uid:uid},
                        success:function (data) {
                            if(data.code==200){
                                console.log("成功");
                            }else {
                                console.log("失败");
                            }
                        }
                    })
                }
            });
        }
    });
});

//导航固定定位
$(window).scroll(function() {
    var b = $(window).scrollTop();
    if(b>200){
        $('.nav_details_shopping').css({
            'position':'fixed',
            top:0
        }).addClass("animated slideInDown");
    }else {
        $('.nav_details_shopping').css({
            'position':'relative'
        }).removeClass("animated slideInDown");
    }
});
