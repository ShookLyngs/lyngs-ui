//

const path = require('path');
const resolve = (...paths) => path.join(__dirname, ...paths);

module.exports = {
  // 修改 src 为 examples
  pages: {
    index: {
      entry: 'examples/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
    }
  },
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('{examples}', resolve('examples'))
      .set('{packages}', resolve('packages'))
      .set('{public}', resolve('public'))
      .set('{types}', resolve('types'));

    config.module
      .rule('js').include.add(resolve('packages')).end()
      .rule('ts').include.add(resolve('packages')).end()
      .use('babel').loader('babel-loader');
  }
};