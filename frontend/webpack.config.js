const path = require('path')
const webpack = require('webpack');


module.exports ={
    mode:'development',
    devtool:'eval',

    resolve:{
        extensions:['.js','.jsx'],
    },

    entry:{
        app:['./client'] //client에서 하위것을 다가져오기때문에 client만 써도됨
    },

    module:{
        rules:[
        {
            test:/\.jsx?$/,
            loader: 'babel-loader',
            options:{
                presets:[
                    ['@babel/preset-env',
                    {
                        targets:{
                            browsers: ['> 5% in KR', 'last 2 chrome versions'], //https://github.com/browserslist/browserslist
                        },
                        debug:true, //preset-env에 대해서 debug
                    }
                ], 
                    '@babel/preset-react'
                ],
                plugins:['@babel/plugin-proposal-class-properties'],
            }
        },
        {
            test : /\.css$/,
            use: ['style-loader', 'css-loader'],
        },
        {
            test : /\.(png|jpg)$/,
            use: ['file-loader'],
        },
    ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug:true}), //module의 loader에 debug를 다넣어줌
    ],

    output:{
        path: path.join(__dirname, 'static', 'frontend'),
        filename:'main.js',
        publicPath:'/dist/' //express.static 가상경로같은것
    },


}