class DonePlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    // compiler.hooks.done.tap('DonePlugin', () => {
    //   console.log("DONE PLUGIN")
    // })
    compiler.hooks.done.tapAsync('DonePlugin', (stats, callback) => {
      setTimeout(() => {
        console.log('DonePlugin');
        callback()
      }, 3000)
    })
  }
}

module.exports = DonePlugin