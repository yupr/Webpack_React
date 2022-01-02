import path from 'path';
import webpack from 'webpack';

import MiniCssExtractPlugin from 'mini-css-extract-plugin'; //cssをjsにバンドルせずに出力
import HtmlWebpackPlugin from 'html-webpack-plugin'; //ビルドする際にHTMLも同時に出力
import RemoveEmptyScriptsPlugin from 'webpack-remove-empty-scripts'; //不要なjsファイルを削除

const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');

const NODE_ENV = process.env.NODE_ENV || 'production';
const devMode = NODE_ENV !== 'production';
const enabledSourceMap = NODE_ENV === 'development'; //開発時はソースマップを有効

console.log('****************************');
console.log('*** NODE_ENV ***:', NODE_ENV);
console.log('*** enabledSourceMap ***:', enabledSourceMap);
console.log('****************************');

module.exports = {
  //モードの設定、v4系以降はmodeを指定しないと、webpack実行時に警告が出る。
  mode: NODE_ENV === 'production' ? NODE_ENV : 'development',

  entry: [src + '/index.tsx'],
  output: {
    path: dist,
    filename: 'bundle-[contenthash].js',
    assetModuleFilename: 'assets/[name][ext]',
  },
  resolve: {
    alias: {
      src: src,
      components: `${src}/components`,
    },
    extensions: ['.js', '.ts', '.tsx', '.json'],
  },
  target: ['web', 'es5'],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.(scss|css|sass)$/i,
        use: [
          // style-loader: バンドルされたjs内にあるcssの処理をhtmlのhead内に<style></style>として出力する
          // MiniCssExtractPlugin: cssをバンドル対象から外し、cssを別ファイルとして生成+出力してlinkタグに読み込ませる。
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            // cssをjsにバンドル
            loader: 'css-loader',
            options: {
              sourceMap: enabledSourceMap,
            },
          },
          {
            // sassをcssに変換
            loader: 'sass-loader',
            options: {
              sourceMap: enabledSourceMap,
              warnRuleAsWarning: true,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]',
        },
      },
      {
        test: /\.(eot|wof|woff|woff2|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name][ext]',
        },
      },
    ],
  },
  devServer: {
    historyApiFallback: true, //ルートが見つからない場合(404エラー)、index.htmlを返す
    static: {
      directory: dist, //devサーバーを立ち上げた際に表示されるディレクトリの指定
    },
    port: 9000,
  },
  plugins: [
    //webpackで生成したjs,cssを埋め込んだhtmlを生成。
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: src + '/index.html',
      // favicon: src + '/img/sample.jpeg', //ファビコンを設定
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    //環境変数をモジュールに渡す。
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
    }),
    new RemoveEmptyScriptsPlugin(),
  ],
  performance: {
    hints: false,
  },
};
