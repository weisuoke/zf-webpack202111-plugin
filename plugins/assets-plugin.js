class AssetsPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    // 每当 compiler 开始一次新的构建，创建一个新的 compilation 实例，会触发一个钩子事件
    compiler.hooks.compilation.tap("AssetPlugin", (compilation) => {
      // chunk 代码块 asset 产出的资源
      compilation.hooks.chunkAsset.tap("AssetPlugin", (chunk, filename) => {
        console.log(chunk.name, filename)
      })
    })
  }
}

module.exports = AssetsPlugin