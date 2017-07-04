/*****
 *创建服务器
 */
const http=require("http");
const express=require("express");
const qs=require("querystring");
const public_nav=require("./public_nav");
const c_index=require("./c_index");
const register=require("./register");
const detail=require("./detail");
const shopping_cart=require('./shopping_cart');
const user_center=require('./user_center');
var app=express();
http.createServer(app).listen(8080);
app.use(express.static("public"));
app.use((req, res, next) => {
    //处理请求主体数据的中间件
    //异步
    if (req.method === "POST") {
        req.on("data", (buf) => {
            req.body = qs.parse(buf.toString());
            next();
        })

    } else {
        next();
    }//放行

});
//重定向URL————相当于默认首页
app.get("/",(req,res)=>{
    res.redirect("/index.html");
});
app.get('/index/list',public_nav.list);
app.get('/index/search',public_nav.search);
app.post('/public_nav/header_cart',public_nav.header_cart);
app.get('/index/nav',c_index.nav);
app.get('/index/floor',c_index.floor);
app.post('/register/name',register.name);
app.post('/register/success',register.success);
app.post('/register/login',register.login);
app.get('/detail/product',detail.product);
app.get('/detail/model',detail.model);
app.post('/shopping_cart/select',shopping_cart.select);
app.post('/shopping_cart/update',shopping_cart.update);
app.post('/shopping_cart/delete',shopping_cart.delete);
app.post('/shopping_cart/insert',shopping_cart.insert);
app.post('/shopping_cart/submit',shopping_cart.submit);
app.post('/user_center/order',user_center.order);