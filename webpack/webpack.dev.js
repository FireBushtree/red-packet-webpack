import DotenvWebpackPlugin from 'dotenv-webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
  stats: 'errors-warnings',
  cache: {
    type: 'filesystem',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.dev.html',
      filename: 'index.html',
    }),

    new DotenvWebpackPlugin({
      path: './.env.development',
    }),
  ],

  devServer: {
    client: {
      logging: 'error',
    },
    devMiddleware: {
      stats: 'errors-only',
    },

    historyApiFallback: {},
    port: 7400,
    hot: true,
    compress: true,
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    ],
  },
}
