import path from 'path'
import Express from 'express'
import favicon from 'serve-favicon'//设置标题图标
import httpProxy from 'http-proxy'
import compression from 'compression'//压缩
import connectHistoryApiFallback from 'connect-history-api-fallback'//https://blog.csdn.net/astonishqft/article/details/82762354
import config from '../config/config'

const app = new Express();
const port = config.port;

app.use('/', connectHistoryApiFallback());
app.use('/',Express.static(path.join(__dirname,"..",'build')));
app.use('/',Express.static(path.join(__dirname,"..",'static')));


app.use(compression());
app.use(favicon(path.join(__dirname,'..','static','favicon.ico')));

//热更新
if(process.env.NODE_ENV!=='production'){
    const Webpack = require('webpack');
    const WebpackDevMiddleware = require('webpack-dev-middleware');
    const WebpackHotMiddleware = require('webpack-hot-middleware');
    const webpackConfig = require('../webpack.dev');

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


