var uid=sessionStorage.getItem('uid');
if(uid==null){
    location.href='login.html';
}
$.ajax({
    url:'/shopping_cart/select',
    type:'post',
    data:{uid:uid},
    success:function (data) {
        if(data.length!=0){
        var html="";
        $(data).each(function (i) {
            html+=`<div class="item-row">
            <div class="col-check">
                <input type="checkbox" class="checks" name="${data[i].mid}">
            </div>
            <div class="col-img"><img src="img/${data[i].img_s}" alt=""></div>
            <div class="col-name"><a href="../details.html">${data[i].name} &nbsp;${data[i].mname}&nbsp;${data[i].cname}</a></div>
            <div class="col-price">${data[i].price}元</div>
            <div class="col-num"><a href="#" class="reduce">-</a><input type="text" class="num" name="${data[i].sid}" value="${data[i].num}"><a href="#" class="add">+</a></div>
            <div class="col-total">${data[i].price*data[i].num}元</div>
            <div class="col-action"><span class="glyphicon glyphicon-remove"></span></div>
        </div>`
        });}else{
            html=`<h1 style="color:#f56600;text-align: center;">购物车没有商品，赶紧去选购哦！</h1>`
        }
        $('.cart-detail').html(html);
        pirceTotal();
        var $checkall=$('#check-all');
        var $checks=$('.item-row .checks');
        //全选按钮绑定事件
        $checkall.click(function () {
            var t=$checkall.prop('checked');
            $.each($checks,function (i) {
                $(this).prop('checked',t);
            });
            pirceTotal();
        });
        //复选框绑定事件
        $('.cart-detail').on('click','.checks',function () {
            if($(this).prop('checked')){
                $.each($checks,function () {
                    if(!$(this).prop('checked')){
                        $checkall.prop('checked',false);
                        return false;
                    }
                    $checkall.prop('checked',true);
                })
            }else {
                $checkall.prop('checked',false);
            }
            pirceTotal();
        });
    }
});
//遍历复选框，选中的进行累加修改总计
function pirceTotal() {
    var price=0;
    var $checkall=$('#check-all');
    var $checks=$('.item-row .checks');
    var checkNum=0;
    var checkallNum=$checks.length;
    $checks.each(function () {
        if($(this).prop('checked')){
            price+=parseFloat($(this).parent().parent().children().eq(5).html());
            checkNum++;
        }
    });
    $('.price-total span').html(price);
    $('.num-choose').html(checkNum);
    $('.num-total').html(checkallNum);
};
//加减事件绑定
$('.cart-detail').click(function (e) {
    var n=0;
    var subtotal=0;
    if(e.target.className=="add"){
        e.preventDefault();
        var sid=$(e.target).prev().attr('name');
        n=parseInt($(e.target).prev().val())+1;
        $(e.target).prev().val(n);
        subtotal=parseFloat($(e.target).parent().prev().html())*n;
        $(e.target).parent().next().html(subtotal+'元');
        pirceTotal();
        $.ajax({
            url:'/shopping_cart/update',
            type:'post',
            data:{num:n,sid:sid}
        });
    }else if(e.target.className=="reduce"){
        e.preventDefault();
        var sid=$(e.target).next().attr('name');
        n=parseInt($(e.target).next().val())-1;
        n<1&&(n=1);
        $(e.target).next().val(n);
        subtotal=parseFloat($(e.target).parent().prev().html())*n;
        $(e.target).parent().next().html(subtotal+'元');
        pirceTotal();
        $.ajax({
            url:'/shopping_cart/update',
            type:'post',
            data:{num:n,sid:sid}
        });
    }
});
//数量输入框按键监听
$('.cart-detail').on('keyup','.num',function () {
    var n=$(this).val();
    var sid=$(this).attr('name');
    n<1&&(n=1);
    $(this).val(n);
    var subtotal=parseFloat($(this).parent().prev().html())*n;
    $(this).parent().next().html(subtotal);
    pirceTotal();
    $.ajax({
        url:'/shopping_cart/update',
        type:'post',
        data:{num:n,sid:sid}
    });
});

$('.cart-detail').on('click','.col-action span',function () {
    var sid=$(this).parent().prev().prev().children().eq(1).attr('name');
    var obj=this;
    $.ajax({
        url:'/shopping_cart/delete',
        type:'post',
        data:{sid:sid},
        success:function (data) {
            if(data.code===200){
                $(obj).parent().parent().remove();
                console.log("成功");
            }else{
                console.log("失败");
            }
            pirceTotal();
        }
    });
});
$('.submit-btn').click(function () {
    var price=$('.price-total span').html();
    console.log(price);
    var mid=[];
    var $checks=$('.checks');
    var counts=[];
    $.each($checks,function () {
        if($(this).prop('checked')){
            mid.push($(this).attr('name'));
           counts.push($(this).parent().parent().children('div').eq(4).children().eq(1).val());
        }
    });
    console.log(counts);
    console.log(mid);
    if(mid.length!==0) {
        mid=mid.toString();
        counts=counts.toString();
        console.log(counts);
        console.log(mid);
        $.ajax({
            url:'/shopping_cart/submit',
            type:'post',
            data:{uid:uid,price:price,state:1,type:1,mids:mid,counts:counts},
            success:function (data) {
                console.log(data);
                if(data.code===200){
                    location.href='user_center.html';
                }else {
                    console.log(data.msg);
                }
            }
        })
    }else {
        alert('至少选择一件商品')
    }
})