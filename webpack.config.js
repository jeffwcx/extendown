var webpack = require('webpack');
var path = require("path");
var packageJSON = require('./package.json');

const ENV  = process.env.NODE_ENV;
console.log('Build environment is ' + ENV);
var config = {
  entry: {
    extendown: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    library: 'Extendown',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [
          path.resolve(__dirname, "src")
        ],
        options: {
          plugins: ['transform-es2015-template-literals',
            'transform-es2015-literals',
            'transform-es2015-function-name',
            'transform-es2015-arrow-functions',
            'transform-es2015-block-scoped-functions',
            'transform-es2015-classes',
            'transform-es2015-object-super',
            'transform-es2015-shorthand-properties',
            'transform-es2015-computed-properties',
            'transform-es2015-for-of',
            'transform-es2015-sticky-regex',
            'transform-es2015-unicode-regex',
            'check-es2015-constants',
            'transform-es2015-spread',
            'transform-es2015-parameters',
            'transform-es2015-destructuring',
            'transform-es2015-block-scoping',
            'transform-es2015-typeof-symbol',
            ['transform-regenerator', { async: false, asyncGenerators: false }]],
        }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin(packageJSON.name
      + " v"+ packageJSON.version
      + "\r\nauthor "+ packageJSON.author)
  ],
  devtool: "#source-map"
};

if(ENV === "build-min") {
  config.entry = {
    'extendown.mini': './src/index.js'
  };
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
  
}

module.exports = config;
