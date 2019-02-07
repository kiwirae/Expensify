const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = (env) => {
  const isProduction = env === 'production'
  const CSSExtract = new ExtractTextPlugin('styles.css')

  console.log(env)
  return {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
      path: path.resolve(__dirname, 'public/scripts'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', 
          options: {
            presets: ['env', 'react'],
            plugins: ['transform-object-rest-spread', 'transform-class-properties']
          }
        }
      }, {
        test: /\.s?css$/,
        use: CSSExtract.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            }, {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }]
    },
    plugins: [
      CSSExtract
    ],
    devServer: {
      contentBase: path.resolve(__dirname, 'public'),
      publicPath: '/scripts/',
      historyApiFallback: true
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map'
  }
}

