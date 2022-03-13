const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  // 指定入口文件
  entry: './src/main.ts',
  // 指定打包后的文件
  output: {
    path: path.resolve(__dirname, 'dist'),
    environment: {
      // 关闭箭头函数
      arrowFunction: false
    }
  },

  // 指定 webpack 打包所需模块配置
  module: {
    rules: [
      {
        // 指定生效文件
        test: /\.ts$/,
        // 指定使用的 loader
        use: [
          // 配置 babel
          {
            // 指定加载器
            loader: 'babel-loader',
            options: {
              // 设置预定义环境
              presets: [
                [
                  // 指定环境插件
                  '@babel/preset-env',
                  // 配置信息
                  {
                    // 要兼容的目标环境
                    targets: {
                      chrome: '58',
                      ie: '11'
                    },
                    // 指定 corejs 版本
                    corejs: '3',
                    // 按需加载 corejs
                    useBuiltIns: 'usage'
                  }
                ]
              ]
            }
          },
          'ts-loader'
        ],
        // 要排除的文件
        exclude: /node-modules/
      },
      // 设置 less 文件处理
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // 引入并配置 postcss
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // 兼容前两个版本
                      browsers: 'last 2 versions'
                    }
                  ]
                ]
              }
            }
          },
          'less-loader'
        ]
      }
    ]
  },

  // 配置 webpack 插件
  plugins: [
    // 清空 dist 目录
    new CleanWebpackPlugin(),
    // 按模板打包新建 dist
    new HtmlWebpackPlugin({
      // 指定模板
      template: './src/index.html',
      // 配置 ico 图标
      favicon: path.resolve(__dirname, 'src/assets/hero.ico')
    })
  ],

  // 设置引用模块
  resolve: {
    extensions: ['.ts', '.js']
  }
}
