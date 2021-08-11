/**
 * webpack.config.js webpack的配置文件
 *  作用：指示webpack做什麼事（運行webpack指令時，會加載其中的配置）
 * 
 * 所有的構建工具都是基於Node.js平臺運行的
 * 模塊化默認採用commonjs
 */

// resolve用來拼接絕對路徑的方法
const { resolve } = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    // webpack 配置
    entry: './app/js/script.js',

    output: {
        filename: 'js/built.[hash:10].js',
        // __dirname Nodejs的變量，代表當前文件的目錄絕對路徑
        path: resolve(__dirname, 'dist')
    },

    // loader的配置
    module: {
        rules: [
            {
                // js語法檢查 eslint-loader eslint
                // 注意：只檢查自己寫的源代碼，第三方庫不用檢查
                // 設置檢查規則：
                //  package.json中eslintConfig設置
                //      airbnb --> eslint-config-airbnb-base eslint eslint-plugin-import
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    fix: true
                }
            },
            // 詳細loader配置
            {
                test: /\.css$/,
                use: [
                    // use數組中loader執行順序爲從右到左，從上到下，依次執行
                    // 創建style標籤，將js中的樣式資源插入，添加到head中生效
                    // 'style-loader', //或者 MiniCssExtractPlugin.loader
                    MiniCssExtractPlugin.loader,  
                    // 將css文件變成commonjs模塊加載到js中，裏面內容是樣式字符串
                    'css-loader',

                    /**
                     * css兼容性處理： postcss --> postcss-loader postcss-preset-env
                     * 
                     * 幫postcss找到package.json中browserslist裏面的配置，通過配置加載指定的css兼容性樣式
                     * 
                     * "browserslist": {
                     *      "development": [
                     *          "last 1 chrome version"
                     *      ],
                     *      // 默認爲生產環境，與mode無關，需設置node環境變量： process.env.NODE_ENV = "development" (在module.exports之前)
                     *      "production": [
                     *          ">0.2%",
                     *          "not dead",
                     *          "not op_mini all"
                     *      ]
                     * }
                     */

                    // 使用loader的默認配置
                    // 'postcss-loader',
                    // 修改loader的配置
                    
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                    require('postcss-preset-env')
                                ]
                            }
                    }
                    
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.html$/,
                // 處理html文件中的img圖片，從而被url-loader處理
                loader: 'html-loader',
               
            },
            {
                // 默認無法處理html中img圖片
                test: /\.(jpe?g|png|gif)$/,
                // 下載url-loader file-loader
                loader: 'url-loader',
                options: {
                    // 圖片大小小於8kb，就會被base64編碼處理爲字符串
                    // 優點：減少請求數量（減輕服務器壓力）
                    // 缺點：圖片體積會更大（文件請求速度更慢）
                    // 所以只會對小圖片進行base64處理，通常來說8-12kb以下都行
                    limit: 12 * 1024,
                    
                    // 問題：因爲url-loader默認使用es6模塊化解析，而html-loader引入圖片是commonjs，解析時會出問題：[object Module]
                    // 必須關閉url-loader的es6模塊化，使用commonjs解析
                    esModule: false,

                    // 給圖片進行重命名
                    // [hash:10]取圖片的hash的前10位
                    // [ext]取文件原來的擴展名
                    name: '[name].[hash:10].[ext]',
                    outputPath: 'assets/images'
                
                }
            },
            

            // 其他資源： exclude: , loader: file-loader
            
        ]
    },

    plugins: [
        // html-webpack-plugin
        // 功能：默認創建一個空的html，自動引入打包輸出的所有資源（JS/CSS）
        // 需求：需要有結構的HTML
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            favicon: './assets/images/favicon-32x32.png'
        }),

        new MiniCssExtractPlugin({
            filename: "css/main.css"
        })
    ],

    mode: 'development',

    // devServer用於自動化
    // 只會在內存中編譯打包，不會有任何輸出(即不會有dist文件夾產生)
    // 啓動devServer的指令： npx webpack-dev-server
    devServer: {
        contentBase: resolve(__dirname, 'dist'),
        // 啓動gzip壓縮
        compress: true,
        port: 3000,
        // 自動打開瀏覽器
        open: true,
    },
    
    target: 'web',
    
}