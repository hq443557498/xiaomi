var u='',p='';
$('#uname').keyup(function () {
    var uname=$(this).val();
    var reg = /^1[3|4|5|7|8][0-9]{9}$/;
    if(!reg.test(uname)){
        $('.dis_box i').css('display','inline-block');
        $('.dis_box span').text('请输入正确的手机号码');
        u=null;
    }else{
        $('.dis_box i').css('display','none');
        $('.dis_box span').text('账号格式正确!');
        u=uname;
    }
});
$('#upwd').keyup(function () {
    var upwd=$(this).val();
    var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
    if(!reg.test(upwd)){
        $('.dis_box i').css('display','inline-block');
        $('.dis_box span').text('必须是由数字和密码组成的6~12位密码');
        p=null;
    }else{
        $('.dis_box i').css('display','none');
        $('.dis_box span').text('密码格式正确！');
        p=upwd;
    }
});
$('#login-btn').click(function () {
    if(u!=null&&p!=null){
        $.ajax({
            type:'post',
            url:'/register/login',
            data:{uname:u,upwd:p},
            success:function (data) {
                if(data.code==200){
                    sessionStorage.setItem('uid',data.uid);
                    sessionStorage.setItem('uname',data.uname);
                    window.location.href="index.html";
                }else{
                    $('.dis_box i').css('display','inline-block');
                    $('.dis_box span').text(data.msg);
                }
            }
        })
    }
})