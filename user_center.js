const pool=require('./pool');
module.exports= {
    order:(req,res)=>{
        var uid=req.body.uid;
        var type=req.body.type;
        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                throw new  Error(err);
            }else {
                if (type == 0) {
                    conn.query('SELECT o.oid,o.uid,o.price,o.state,o.type,o.otime,u.uname FROM xm_order o,xm_user u WHERE o.uid=? AND o.uid=u.uid order by o.oid desc',[uid],(err,result)=>{
                        if(err){
                            console.log(err);
                            throw new  Error(err);
                        }else{
                            if(result.length===0){
                                res.json(result);
                                conn.release();
                            }
                            console.log(result);
                            var n=0;
                            for(let i=0;i<result.length;i++){
                                conn.query('SELECT p.img_s,p.name,c.cname,m.mname,m.price,op.count FROM xm_products p,xm_color c,xm_model m,xm_order_product op WHERE op.oid=? AND op.mid=m.mid AND m.cid=c.cid AND c.pid=p.pid',[result[i].oid],(err,data)=>{
                                    if(err){
                                        console.log(err);
                                        throw new  Error(err);
                                    }else{
                                        result[i]['products']=data;
                                        n++;
                                    }
                                    if(n===result.length){
                                        res.json(result);
                                        conn.release();
                                    }
                                })
                            }
                        }
                    })
                }else{
                    conn.query('SELECT o.oid,o.uid,o.price,o.state,o.type,o.otime,u.uname FROM xm_order o,xm_user u WHERE o.uid=? AND o.uid=u.uid AND o.type=? order by o.oid desc ',[uid,type],(err,result)=>{
                        if(err){
                            console.log(err);
                            throw new  Error(err);
                        }else{
                            if(result.length===0){
                                res.json(result);
                                conn.release();
                            }
                            console.log(result);
                            var n=0;
                            for(let i=0;i<result.length;i++){
                                conn.query('SELECT p.img_s,p.name,c.cname,m.mname,m.price,op.count FROM xm_products p,xm_color c,xm_model m,xm_order_product op WHERE op.oid=? AND op.mid=m.mid AND m.cid=c.cid AND c.pid=p.pid',[result[i].oid],(err,data)=>{
                                    if(err){
                                        console.log(err);
                                        throw new  Error(err);
                                    }else{
                                        result[i]['products']=data;
                                        n++;
                                    }
                                    if(n===result.length){
                                        console.log(result);
                                        res.json(result);
                                        conn.release();
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    }
};