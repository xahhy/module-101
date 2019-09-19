/**
 * module.js
 */
class Module {
  constructor(id, exports = {}) {
    this.id = id;
    this.exports = exports;
  }
}

function cache(module, require) {
  /**
   * cache/cache.js
   */
  class Cache {
    constructor() {
      this.cache = {};
    }
    get(key) {
      return this.cache[key];
    }
    set(key, value) {
      return (this.cache[key] = value);
    }
  }

  module.exports = new Cache(); // 导出一个实例化的 Cache 对象。
}
const cacheModule = new Module('cache.js');
cache(cacheModule);
console.log(cacheModule);

const modules = {
  './cache': cacheModule,
};
const __require__ = (id) => modules[id].exports; // 避免与 Nodejs 自身的 require 冲突。
function index(module, require) {
  /**
   * cache/index.js
   */
  const cache = require('./cache'); // 导入 Cache 模块中实例化的 Cache 对象。

  cache.set('name', 'Herb');
  console.log(cache.get('name')); // Herb
}
const indexModule = new Module('index.js');
index(indexModule, __require__); // Herb
