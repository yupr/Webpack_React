import path from 'path';
import webpack from 'webpack';

//CSSをJSにバンドルせずに出力するため
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

//ビルドする際にHTMLも同時に出力するため
import HtmlWebpackPlugin from 'html-webpack-plugin';

const src = path.resolve(__dirname, 'src')
const dist = path.resolve(__dirname, 'dist')

const NODE_ENV = process.env.NODE_ENV || 'production';
const IS_DEVSERVER = !!(process.env.IS_DEVSERVER)

console.log('****************************')
console.log('*** NODE_ENV ***:', NODE_ENV)
console.log('*** IS_DEVSERVER ***', IS_DEVSERVER)
console.log('****************************')

module.exports = {
  //モードの設定、v4系以降はmodeを指定しないと、webpack実行時に警告が出る。
  mode: NODE_ENV === 'production' ? NODE_ENV : 'development',

  entry: [
    src + '/index.tsx',
  ],
  output: {
    path: dist,
    filename: 'bundle-[contenthash].js',
  },

  resolve: {
    alias: {
      'src': src,
      'components': `${src}/components`,
    },
    extensions: ['.js', '.ts', '.tsx', '.json']
  },
  // ES5(IE11等)向けの指定（webpack 5以上で必要）
  // target: ["web", "es5"],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.(scss|css)$/,
        use: [
          // IS_DEVSERVER ? "style-loader" : MiniCssExtractPlugin.loader,
          // バンドル後のjsファイルからcss部分を別ファイルとして出力してlinkタグに読み込ませる。
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpg|jpeg|eot|wof|woff|woff2|ttf|svg)$/,
        use: [{
          loader: 'file-loader', //fileをjsにバンドルせずにリソースとして出力する。
          options: {
            name: 'assets/[name].[ext]',
          }
        }]
      }
    ]
  },
  devServer: {
    historyApiFallback: true, //ルートが見つからない場合(404エラー)、index.htmlを返す
    static: {
      directory: dist, //devサーバーを立ち上げた際に表示されるディレクトリの指定
    },
    port: 9000
  },
  plugins: [
    //webpackで生成したjs,cssを埋め込んだhtmlを生成。
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: src + '/index.html',
      // favicon: src + '/img/start.jpeg', //ファビコンを設定
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    //環境変数をモジュールに渡す。
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(NODE_ENV),
    })
  ],
  performance: {
    hints: false
  }
}
