const pool=require('./pool');
module.exports= {
    nav: (req, res) => {
        var str = req.query.str;
        var obj=str.split(',');
        var data=[];
        var n=0;//已经完成的异步查询
        // console.log(obj);
        for(let i=0;i<obj.length;i++) {//解决闭包问题
            pool.getConnection((err, conn) => {
                if (err) {
                    throw new Error(err);
                } else {
                    conn.query("SELECT name,img_s,pid FROM xm_products WHERE type=? LIMIT 0,8", [obj[i]], (err, result) => {
                        if (err) {
                            throw new Error(err);
                        } else {
                            data=data.concat(result);
                            n++;
                            if(n==obj.length){
                                res.json(data);
                            }
                            conn.release();
                        }
                    })
                }
            })
        }
    },
    floor:(req,res)=>{
        var str = req.query.str;
        var obj=str.split(',');
        var data=[];
        var n=0;//已经完成的异步查询
        // console.log(obj);
        for(let i=0;i<obj.length;i++) {//解决闭包问题
            pool.getConnection((err, conn) => {
                if (err) {
                    throw new Error(err);
                } else {
                    conn.query("SELECT name,img_m,pid,title,detail,price FROM xm_products WHERE type=? LIMIT 0,7", [obj[i]], (err, result) => {
                        if (err) {
                            throw new Error(err);
                        } else {
                            data=data.concat(result);
                            n++;
                            if(n==obj.length){
                                res.json(data);
                            }
                            conn.release();
                        }
                    })
                }
            })
        }
    }
}