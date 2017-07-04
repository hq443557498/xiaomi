var uid=sessionStorage.getItem('uid');
if(uid==null){
    location.href='login.html';
}

dataType(uid,0);
var result='';
function dataType(uid,type) {
    $.ajax({
        url: '/user_center/order',
        type: 'post',
        data: {uid: uid,type:type},
        success: function (data) {
            result = data;
            var page=$('.page').val();
            pageProduct(data,page)
        }
    });

}

$('.order-page .prev').click(function () {
        var n=$('.page').val();
        n--;
        n<1&&(n=1);
        $('.page').val(n);
        pageProduct(result,n);

    });
$('.order-page .next').click(function () {
    var n=$('.page').val();
    n++;
    n>Math.ceil(result.length/4)&&(n=Math.ceil(result.length/4));
    $('.page').val(n);
    pageProduct(result,n);

});
function pageProduct(data,page) {
    var html="";
    if(data.length!=0) {
        for (var i = (page - 1) * 4; i < (page * 4 > data.length ? data.length : page * 4); i++) {
            html += `<li>
                    <div class="caption">
                        <h3 class="order-status">${data[i].type == 1 ? '待支付' : data[i].type == 2 ? '待收货' : data[i].type == 3 ? '已关闭' : '已完成'}</h3>
                        <p class="caption-info">${data[i].otime}<span></span>${data[i].uname}<span></span>订单号： ${data[i].oid}<span></span>${data[i].state == 1 ? '在线支付' : data[i].state == 2 ? '货到付款' : data[i].state == 3 ? '支付宝支付' : '微信支付'}</p><p class="caption-price">订单金额：<b>${data[i].price}</b>元</p>
                    </div><ul class="order-detail-list">`;

            var products = data[i].products;
            for (var r = 0; r < products.length; r++) {

                html +=
                    `
                 
                        <li>
                            <a href="details.html"><img src="img/${products[r].img_s}" alt=""></a>
                            <div class="order-detail-text">
                                <p><a href="details.html">${products[r].name} ${products[r].mname} ${products[r].cname}</a></p>
                                <p>${products[r].price}元 × ${products[r].count}</p>
                            </div>
                        </li>
                    `
            }
            ;
            html += `</ul></li>`;
        }
    }else{
        html=`<li><h1 style="color:#f56600">没有相关订单哦！</h1></li>`
    }
    $('.order-lists').html(html);
}
$('.my-order-nav a').click(function (e) {
    e.preventDefault();
    $(this).addClass('active').parent().siblings().children().removeClass('active');
    $('.page').val(1);
    var type=$(this).attr('href');
    dataType(uid,type);
});