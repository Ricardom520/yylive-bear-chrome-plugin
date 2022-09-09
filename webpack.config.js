const path = require('path')
const CaseSensitivePathsplugin = require('case-sensitive-paths-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackBar = require('webpackbar')
const { DefinePlugin } = require('webpack')

module.exports = {
  entry: path.resolve(__dirname, './src'),
  output: {
    clean: true,
    path: path.join(__dirname, './dist/'),
    filename: 'js/contentScript.js',
    environment: {
      // The environment supports arrow functions ('() => { ... }').
      arrowFunction: true,
      // The environment supports BigInt as literal (123n).
      bigIntLiteral: false,
      // The environment supports const and let for variable declarations.
      const: true,
      // The environment supports destructuring ('{ a, b } = obj').
      destructuring: true,
      // The environment supports an async import() function to import EcmaScript modules.
      dynamicImport: false,
      // The environment supports 'for of' iteration ('for (const x of array) { ... }').
      forOf: true,
      // The environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...').
      module: false,
      // The environment supports optional chaining ('obj?.a' or 'obj?.()').
      optionalChaining: true,
      // The environment supports template literals.
      templateLiteral: true,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    fallback: {
      process: require.resolve('process/browser'),
    },
    extensions: ['.ts', '.less']
  },
  module: {
    rules: [
      {
        test: /\.html/,
        type: 'asset/resource',
        generator: {
          filename: '[path]/[name]'
        }
      },
      {
        test: /\.json/,
        type: 'asset/resource',
        generator: {
          filename: '[name].[ext]'
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modeules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    // 强制执行所有必须模块的整个路径，匹配磁盘上实际路径的确切大小写，避免大小写问题引起的玛法
    new CaseSensitivePathsplugin(),
    // 进度条插件
    new WebpackBar(),
    // new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from : path.resolve(__dirname, './static'), // 不打包直接输入的文件
          to: '', // 打包后静态文件放置位置
          globOptions: {
            ignore: ['.*'] // 忽略规则。（这种写法表示将改文件夹下的所有文件复制）
          }
        }
      ]
    })
  ]
}