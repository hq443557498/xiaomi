const pool=require('./pool');
module.exports={
    product:(req,res)=>{
        var pid=req.query.pid;
        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                throw new  Error(err);
            }else {
                conn.query("SELECT p.name,p.title,p.detail,c.cname,c.img_l,c.cid FROM xm_products p,xm_color c WHERE c.pid=p.pid AND p.pid=?",[pid],(err,result)=>{
                    if (err){
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
    model:(req,res)=>{
    var cid=req.query.cid;
    pool.getConnection((err,conn)=>{
        if(err){
            console.log(err);
            throw new  Error(err);
        }else {
            conn.query("SELECT mid,mname,count,price FROM xm_model WHERE cid=?",[cid],(err,result)=>{
                if (err){
                    console.log(err);
                    throw new  Error(err);
                }else {
                    res.json(result);
                    conn.release();
                }
            })
        }
    })
}
}