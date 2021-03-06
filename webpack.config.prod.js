var path         = require('path');
var webpack      = require('webpack');
var autoprefixer = require('autoprefixer');
var version      = require('./package.json').version;

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    'expose?$!expose?jQuery!jquery',
    'bootstrap-webpack!./bootstrap.config.js',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'SENTRY_DSN': JSON.stringify('https://262ab2f8e7f04d13bc0f6e03e00d2f86@app.getsentry.com/87245'),
        'SENTRY_RELEASE': JSON.stringify(version)
      }
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test:   /\.css$/,
        loader: "style-loader!css-loader!postcss-loader"
      },
      {
        test: /\.jpg$/,
        loader: "url-loader?limit=10000&minetype=image/jpg"
      },
      {
        test: /\.png$/,
        loader: "url-loader?limit=10000&minetype=image/png"
      },
      {
        test: /\.svg$/,
        loader: "file-loader"
      },
    ]
  },
  postcss: function (webpack) {
    return [ autoprefixer ];
  }
};
