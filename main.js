const fs = require('fs');
const route = require('koa-route');
const Koa = require('koa');
const path = require('path');
const serve = require('koa-static');
const app = new Koa();

// app.use(async ctx => {
//     ctx.body = "Hello,World!";
// });


// x-response-time 执行时间
app.use(async (ctx,next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time',`${ms}ms`);
});

// logger 记录
app.use(async (ctx,next) =>{
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} -${ms}`);
});
/*
* 路由
* */
// /about页面内容
const about = ctx => {
    ctx.type = 'html';
    ctx.body = '<a href="/">Index Page</a><p>This is About page</p>';
};
//  首页内容
const main = ctx => {
    ctx.body = '<h1>Hello cH!</h1>';
};
// 静态资源
const accessFiles = serve(path.join(__dirname));
// 重定向
const redirect = ctx => {
    ctx.redirect('/');
};

/*
* 中间件
* */




/*
* 路由
* */
app.use(route.get('/', main));
app.use(route.get('/about', about));
app.use(accessFiles);
app.use(route.get('/redirect',redirect));
app.listen(3000);
