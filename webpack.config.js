//引入node路径
var path = require('path');
//引入自动加载JS入口
var glob = require('glob');
//引入webpack
var webpack = require('webpack');
//分离css文件
var ExtractTextPlugin =  require('extract-text-webpack-plugin');
//清理hash生成的冗余文件
var CleanWebpackPlugin = require('clean-webpack-plugin');
//生成html
var HtmlWebpackPlugin = require('html-webpack-plugin');
//拷贝插件
var CopyWebpackPlugin = require('copy-webpack-plugin');
//自动匹配入口文件
function entries (globPath) {

    var files = glob.sync(globPath);

    var entries = {}, entry, dirname, basename;

    for (var i = 0; i < files.length; i++) {

        entry = files[i];

        basename = path.basename(entry, '.js');

        entries[path.join(basename)] = './' + entry;
    }
    return entries;
}

module.exports = {
    //入口文件
    entry: entries('./src/js/*.js'),
    //输出文件
    output:{

        path: path.resolve(__dirname,'./public'),

        filename: 'js/[name].js'
    },

    //devtool: 'inline-source-map',

    module:{

        rules: [

            {
                test: /\.scss|css$/,

                use: ExtractTextPlugin.extract({

                    fallback: 'style-loader',

                    use: [{

                        loader: 'css-loader',

                        options:{

                            minimize: true //css压缩
                        }
                    },
                    {

                        loader: 'sass-loader',
                    }],

                    publicPath: '../'
                })
            },
            {
                test: /\.png|jpe?g|gif|svg$/,

                use: [{

                    loader: 'url-loader',

                    options: {

                        limit: 81920,

                        name: '[name].[ext]',

                        outputPath: './img'
                    }
                }]
            }
        ]
    },
    //引入vueJS
    resolve: {

        alias: {

          'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        //引入jquery
        new webpack.ProvidePlugin({

            jQuery: 'jquery',

            $: 'jquery'
        }),
        //分离css
        new ExtractTextPlugin({

            filename: './css/[name].css'
        
        }),
        //清理CSS缓存
        new CleanWebpackPlugin(['./static'],{

            root: __dirname,

            verbose: true,

            dry: false
        }),
        //拷贝插件
        /*new CopyWebpackPlugin([

            {
                from: './src/plugins',

                to: './plugins'
            }
        ])*/

        //模板注册
        new HtmlWebpackPlugin({

            template: './src/views/login.html',

            filename: path.resolve(__dirname,'./views/login.html'),

            title: '登录',

            chunks:['login']
        })
    ],
    
    devServer:{
        
        contentBase:'./'
    }
}