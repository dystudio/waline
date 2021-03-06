const path = require('path');
const es3ifyPlugin = require('es3ify-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');

const pkgName = 'Waline';
module.exports = {
  mode: 'production',
  entry: {
    [pkgName + '.min']: path.resolve(__dirname, 'src/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: pkgName,
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
  // resolve: {
  //   alias: {
  //     'react': 'anujs',
  //     'react-dom': 'anujs',
  //     'prop-types': 'anujs/lib/ReactPropTypes',
  //     'create-react-class': 'anujs/lib/createClass',
  //   }
  // },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader?cacheDirectory'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new es3ifyPlugin(),
    new htmlWebpackPlugin({
      inject: false,
      templateContent: ({htmlWebpackPlugin}) => `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>${htmlWebpackPlugin.options.title}</title>
        </head>
        <body>
        <span id="/" class="leancloud_visitors">
          <em class="post-meta-item-text">阅读量 </em>
          <i class="leancloud-visitors-count"></i>
        </span>
          <div id="waline" style="max-width: 800px;margin: 0 auto;"></div>
          ${htmlWebpackPlugin.tags.bodyTags}
          <script>
            new Waline({
              el: '#waline',
              path: '/',
              visitor: true,
              serverURL: 'http://localhost:3000'
            });
          </script>
        </body>
        </html>
      `
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};
