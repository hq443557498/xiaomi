var u='',p='';
$('#uname').keyup(function () {
    var uname=$(this).val();
    var reg = /^1[3|4|5|7|8][0-9]{9}$/;
    if(!reg.test(uname)){
        $('.phone').css('display','inline-block');
        u=null;
    }else{
        $.ajax({
                type:'post',
            url:'/register/name',
            data:{name:uname},
            success:function (data) {
                if(data.code==1){
                    $('.phone i').css('display','none');
                    $('.phone span').html(data.msg).css('color','green');
                    u=uname;
                }else if(data.code==-1){
                    $('.phone i').css('display','inline-block');
                    $('.phone span').html(data.msg);
                    u=null;
                }
            }
        });
    }
});
$('#upwd').keyup(function () {
    var upwd=$(this).val();
    var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
    if(!reg.test(upwd)){
        $('.password').css('display','inline-block');
        p=null;
    }else{
        $('.password').css('display','none');
        p=upwd;
    }
});
$('.submit_btn').click(function () {
    if(u!=null&&p!=null){
        $.ajax({
            type:'post',
            url:'/register/success',
            data:{uname:u,upwd:p},
            success:function (data) {
                if(data.code==1){
                    var s=3;
                    $(".success").css('display','block');
                    $('.success .msg').text(data.msg);
                    var timer=setInterval(function () {
                        s--;
                        $(".success .second").text(s);
                            if(s===0){
                                clearInterval(timer);
                                window.location.href="login.html";
                            }
                    },1000)
                }
            }
        })
    }
})