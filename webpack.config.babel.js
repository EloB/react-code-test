import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const tests = ['test1', 'test2', 'test3'];

export default {
  entry: tests.reduce((obj, name) => (obj[name] = `./${name}`, obj), {}),
  output: {
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: resolve('node_modules/'),
        loader: 'babel',
      },
    ]
  },
  plugins: tests.map(name => new HtmlWebpackPlugin({
    template: resolve('template.ejs'),
    filename: `${name}.html`,
    chunks: [name],
    body: '<div id="container"></div>',
  }))
};
