const webpack = require('webpack');
const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');//自动构建html
const OpenBrowserPlugin = require('open-browser-webpack-plugin');//自动打开浏览器
const CleanPlugin = require('clean-webpack-plugin');//用于清除dist文件夹中重复的文件
const ProgressBarPlugin = require('progress-bar-webpack-plugin');//进度条插件
const ROOT_PATH = path.resolve(__dirname);
const ENTRY_PATH = path.resolve(ROOT_PATH, 'src');
const OUTPUT_PATH = path.resolve(ROOT_PATH, 'dist');
const config = require('./config/config');
const devMode = process.env.NODE_ENV !== 'production';
module.exports = {
    entry: {
        index: [
            'react-hot-loader/patch',
            `webpack-hot-middleware/client?path=http://${config.host}:${config.port}/__webpack_hmr`,
            'babel-polyfill',//https://blog.csdn.net/roamingcode/article/details/81975858
            path.resolve(ENTRY_PATH, 'index.js')
        ],
        vendor: ['react', 'react-dom']
    }, // 入口文件
    output: {
        path: OUTPUT_PATH,
        publicPath: '/',
        filename: '[name]-[hash:8].js'
    }, // 打包输出文件
    mode: 'development', // 设置mode
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: true
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: [
                    /node_modules/,
                ],
                use: ['style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]-[local]-[hash:base64:5]',
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.css$/,
                include: [
                    /node_modules/,
                ],
                use: ['style-loader',
                    {
                        loader: 'css-loader'
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader" },
                    { loader: 'css-loader' },
                    { loader: "postcss-loader" },
                    {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true
                        }
                    }]
            },
            {
                test: /\.(png|jpg|gif|JPG|GIF|PNG|BMP|bmp|JPEG|jpeg)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.(eot|woff|ttf|woff2|svg)$/,
                use: 'url-loader'
            },
        ]
    },
    plugins: [
        new CleanPlugin(['dist']),
        new ProgressBarPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),//改善chunk传输
        new webpack.HotModuleReplacementPlugin(),// 不配置页面不加载
        new webpack.DefinePlugin({
            "progress.env.NODE_ENV": JSON.stringify('development')
        }),
        new HtmlwebpackPlugin({
            title: 'tallySys',
            showErrors: true,
        }),
        new webpack.NoEmitOnErrorsPlugin(),//保证出错时页面不阻塞，且会在编译结束后报错
        new webpack.HashedModuleIdsPlugin(),//用 HashedModuleIdsPlugin 可以轻松地实现 chunkhash 的稳定化
        new OpenBrowserPlugin({
            url: `http://${config.host}:${config.port}`
        })
    ],
    optimization: {
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        }
    },
    resolve: {
        extensions: ['.js', '.json', '.sass', '.scss', '.less', 'jsx']
    }
};