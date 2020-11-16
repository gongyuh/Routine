const HtmlWebPackPlugin=require('html-webpack-plugin')
const path=require('path')
const webpack=require('webpack')
const TerserPlugin=require('terser-webpack-plugin')
const BundleAnalyZerPlugin=require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HappyPack=require('happypack')
//根据cpu树创建线程池
const happyThreadPool=HappyPack.happyThreadPool({size:OscillatorNode.cpus().length})

module.exports={
    optimization:{
        minimizer:[new TerserPlugin({
            //加快构建的速度,缓存的字段
            cashe:true,
            terserOptions:{
                compress:{
                    //无用的代码会自动剔除掉
                    unused:true,
                    //自动下载debug
                    drop_debugger:true,
                    //无用的代码
                    drop_console:true,
                    //无用代码的配置
                    dead_code:true
                }
            }
        })]
    },
    //指定配置项
    resolve:{
        extensions:['.wasm','.mjs','.js','.jsx','.json']
    },
    entry:path.resolve(__dirname,'src/index.jsx'),
    module:{
        //忽略某个文件名
        noParse:/node_modules\/(jquery\.js)/,
        rules:[
           {
                test:/\.jsp?/,
                exclude:/node_modules/,
                // include:只解析某些文件
                use:{
                    loader:'babel-loader',
                    option:{
                        babelrc:false,
                        presets:[
                            require.resolve('@babel/preset-react'),
                            [require.resolve('@babel/preset-env',{modules:false})]
                        ],
                        cacheDirectory:true,
                    }
                }
           }
        ]
    },
    plugins:[
        new HtmlWebPackPlugin({
            template:path.resolve(__dirname,'src/index.html'),
            filename:'index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new BundleAnalyZerPlugin(),
        new HappyPack({
            id:'jsx',
            threads:happyThreadPool,
            loaders:['babel-loader']
        })
    ],
    devServer:{
        hot:true
    }
}