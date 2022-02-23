const JSZip = require('jszip')
const { RawSource } = require('webpack-sources')

class ArchivePlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    // emit 当 webpack 确定好输出的内容后会触发一次 emit 钩子，这里是你修改输出文件列表最后的机会，因为这个钩子执行完后就开始把编译后的结果输出到文件系统中去
    compiler.hooks.emit.tap('ArchivePlugin', (compilation) => {
      compilation.hooks.processAssets.tapPromise('ArchivePlugin', (assets) => {
        // assets 本次编译出来的资源文件
        let zip = new JSZip();
        for (let filename in assets) {
          let cacheSource = assets[filename];
          // 获取此文件对应的源代码
          const source = cacheSource.source();
          // 向压缩包里添加文件，文件名叫 filename，文件内容叫 source
          zip.file(filename, source)
        }
        return zip.generateAsync({ type: 'nodebuffer' }).then(content => {
          // 向输出的文件列表中添加一个新的文件
          assets['Archive_' + Date.now() + '.zip'] = new RawSource(content)
        })
      })
    })
  }
}

module.exports = ArchivePlugin