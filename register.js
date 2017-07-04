const pool=require('./pool');
module.exports={
    name:(req,res)=>{
        var uname=req.body.name;
        console.log(uname);
        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                throw new  Error(err);
            }else {
                conn.query("SELECT uname FROM xm_user WHERE uname=?",[uname],(err,result)=>{
                    var data=[];
                    if(err){
                        console.log(err);
                        throw new  Error(err);
                    }else {
                        if(result.length!=0){
                            data={code:-1,msg:'手机号已占用'};
                        }else{
                            data={code:1,msg:'未占用,可以使用的哦'};
                        }
                        res.json(data);
                        conn.release();
                    }
                })
            }
        })

    },
    success:(req,res)=>{
        var uname=req.body.uname;
        var upwd=req.body.upwd;
        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                throw new  Error(err);
            }else {
                conn.query("INSERT INTO xm_user VALUE(NULL,?,?)",[uname,upwd],(err,result)=>{
                    if(err){
                        console.log(err);
                        throw new  Error(err);
                    }else{
                        var data=null;
                        console.log(result);
                        if(result){
                            data={code:1,msg:"注册成功"};
                        }else {
                            data={code:-1,msg:"注册失败"};
                        }
                        res.json(data);
                        conn.release();
                    }
                })
            }
        })
    },
    login:(req,res)=>{
        var uname=req.body.uname;
        var upwd=req.body.upwd;
        pool.getConnection((err,conn)=>{
            conn.query("select uid,uname from xm_user where uname=? and upwd=?",[uname,upwd],(err,result)=>{
                var data=null;
                if(err){
                    console.log(err);
                    throw new  Error(err);
                }else if(result.length===0){
                    data={code:400,msg:"账号或者密码错误，请重新输入"}
                }else{
                    data={code:200,msg:"成功登录",uid:result[0].uid,uname:result[0].uname};
                }
                res.json(data);
                conn.release();
            })
        })
    }

};