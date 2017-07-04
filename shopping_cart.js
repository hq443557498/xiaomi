const pool=require('./pool');
module.exports={
    select:(req,res)=>{
        var uid=req.body.uid;
        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                throw new  Error(err);
            }else{
                conn.query('SELECT p.name,p.img_s,m.mname,c.cname,m.price,s.num,s.sid,m.mid FROM xm_s_cart s,xm_color c,xm_model m,xm_products p WHERE s.mid=m.mid AND m.cid=c.cid AND c.pid=p.pid AND s.uid=?',[uid],(err,result)=>{
                    if(err){
                        console.log(err);
                        throw new  Error(err);
                    }else {
                        res.json(result);
                        conn.release();
                    }
                })
            }
        })
    },
    update:(req,res)=>{
        var sid=req.body.sid;
        var num=req.body.num;
        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                throw new  Error(err);
            }else {
                conn.query('UPDATE xm_s_cart SET num=? WHERE sid=?',[num,sid],(err,result)=>{
                    if(err){
                        console.log(err);
                        throw new  Error(err);
                    }else {
                        conn.release();
                    }
                })
            }
        })
    },
    delete:(req,res)=>{
        var sid=req.body.sid;
        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                throw new  Error(err);
            }else {
                conn.query('DELETE FROM xm_s_cart WHERE sid=? ',[sid],(err,result)=>{
                    if(err){
                        console.log(err);
                        throw new  Error(err);
                    }else {
                        if(result){
                            var data={"code":200,"msg":"成功删除"}
                        }else {
                            var data={"code":400,"msg":"删除失败"}
                        }
                        res.json(data);
                        conn.release();
                    }
                })
            }
        })
    },
    insert:(req,res)=>{
        var mid=req.body.mid;
        var uid=req.body.uid;
        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                throw new  Error(err);
            }else {
                conn.query('SELECT num,sid FROM xm_s_cart WHERE mid=? AND uid=?',[mid,uid],(err,result)=>{
                    if(err){
                        console.log(err);
                        throw new  Error(err);
                    }else {
                        if(result.length===0){
                            conn.query('INSERT INTO xm_s_cart VALUE(null,?,?,1)',[mid,uid],(err,result)=>{
                                if(err){
                                    console.log(err);
                                    throw new  Error(err);
                                }else{
                                    if(result){
                                        var data={"code":200,"msg":"success"};
                                    }else {
                                        var data={"code":400,"msg":"fail"};
                                    }
                                    res.json(data);
                                    conn.release();
                                }
                                    })
                        }else {
                            var num=result[0].num+1;
                            var sid=result[0].sid;
                           conn.query('UPDATE xm_s_cart SET num=? WHERE sid=?',[num,sid],(err,result)=>{
                               if(err){
                                   console.log(err);
                                   throw new  Error(err);
                               }else {
                                   if (result) {
                                       var data = {"code": 200, "msg": "success"};
                                   } else {
                                       var data = {"code": 400, "msg": "fail"};

                                   }
                                   res.json(data);
                                   conn.release();
                               }
                           })
                        }
                        }
                    }
                )
            }
        })
    },
    submit:(req,res)=>{
        var uid=req.body.uid;
        var price=req.body.price;
        var mid=req.body.mids;
        var count=req.body.counts;
        var state=parseInt(Math.random()*4)+1;
        var type=parseInt(Math.random()*4)+1;
        mid=mid.split(',');
        count=count.split(",");
        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                throw new  Error(err);
            }else{
                conn.query('INSERT INTO xm_order VALUE(null,?,?,?,?,now())',[uid,price,state,type],(err,result)=>{
                    if(err){
                        console.log(err);
                        throw new  Error(err);
                    }else{
                        if(result){
                            conn.query('SELECT LAST_INSERT_ID() as id;',(err,result)=>{
                                if(err){
                                    console.log(err);
                                    throw new  Error(err);
                                }else{
                                    if(result){
                                        var oid=result[0].id;
                                        console.log(oid);
                                        var n=0;
                                        for(let i=0;i<mid.length;i++){
                                            conn.query('INSERT INTO xm_order_product VALUE(NULL,?,?,?)',[oid,mid[i],count[i]],(err,result)=>{
                                                if(err){
                                                    console.log(err);
                                                    throw new  Error(err);
                                                }else{
                                                    if(result){
                                                        conn.query('DELETE FROM XM_s_cart WHERE mid=? AND uid=?',[mid[i],uid],(err,result)=>{
                                                            if(err){
                                                                console.log(err);
                                                                throw new  Error(err);
                                                            }else{
                                                                if(result){
                                                                    var data={"code":200,"msg":"成功"};
                                                                }else {
                                                                    var data={"code":400,"msg":"失败"};
                                                                }
                                                                n++;
                                                                if(n==mid.length){
                                                                    res.json(data);
                                                                    conn.release();
                                                                }
                                                            }
                                                        })

                                                    }
                                                }
                                            })
                                        }
                                    }
                                }
                            })
                        }
                    }
                })
            }
        })
    }
}