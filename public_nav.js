const pool=require('./pool');
module.exports={
    list:(req,res)=>{
        var type=req.query.type;
        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                throw new  Error(err);
            }else{
                conn.query("SELECT pid,name,img_m,price,state FROM xm_products WHERE type=? LIMIT 0,6",[type],(err,result)=>{
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
    search:(req,res)=>{
        var kw=req.query.kw;
        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                throw new Error(err);
            }else{
                conn.query("SELECT name FROM xm_products WHERE name LIKE ? LIMIT 0,8",["%"+kw+"%"],(err,result)=>{
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
    header_cart:(req,res)=>{
        var uid=req.body.uid;
        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                throw new Error(err);
            }else{
                conn.query('SELECT p.img_s,p.name,c.cname,m.mname,m.price,s.num FROM xm_products p,xm_color c,xm_model m,xm_s_cart s WHERE s.uid=? AND s.mid=m.mid AND m.cid=c.cid AND c.pid=p.pid',[uid],(err,result)=>{
                    if(err){
                        console.log(err);
                        throw new Error(err);
                    }else{
                        res.json(result);
                        conn.release();
                    }
                })
            }
        })
    }
};
