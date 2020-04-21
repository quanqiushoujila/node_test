const { override, addWebpackAlias, addDecoratorsLegacy, fixBabelImports, addLessLoader, addWebpackPlugin } = require('customize-cra');
const path = require('path')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {},
  }),
  addWebpackAlias({
    "@": path.resolve(__dirname, 'src')
  }),
  addDecoratorsLegacy(), 
  addWebpackPlugin(new AntdDayjsWebpackPlugin())
);