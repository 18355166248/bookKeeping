const path = require('path')
const { override, fixBabelImports, addWebpackAlias } = require('customize-cra')

function pathResolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  }),
  addWebpackAlias({
    '@': pathResolve('src'),
    utils: pathResolve('src/utils'),
    components: pathResolve('src/components'),
    containers: pathResolve('src/containers')
  })
)
