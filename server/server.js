import path from 'path'
import Express from 'express'
import favicon from 'serve-favicon'//设置标题图标
import compression from 'compression'//压缩
import config from '../config/config'
import connectHistoryApiFallback from 'connect-history-api-fallback'//https://blog.csdn.net/astonishqft/article/details/82762354

const app = new Express();
const port = config.port;


app.use('/', connectHistoryApiFallback());

app.use(compression());
// 备注：更换图标不显示时是缓存问题 chtrl + f5 强制刷新即可
app.use(favicon(path.join(__dirname,'..','public','favicon.ico')));

//热更新
if(process.env.NODE_ENV!=='production'){
    const Webpack = require('webpack');
    const WebpackDevMiddleware = require('webpack-dev-middleware');
    const WebpackHotMiddleware = require('webpack-hot-middleware');
    const webpackConfig = require('../webpack.config');

    const compiler = Webpack(webpackConfig);

    app.use(WebpackDevMiddleware(compiler, {
        publicPath: '/',
        stats: {colors: true},
        lazy: false
    }));
    app.use(WebpackHotMiddleware(compiler));
}

app.listen(port,(err)=>{
    if(err){
        console.error(err)
    }else{
        console.log(`===>open http://${config.host}:${config.port} in a browser to view the app`);
    }
});