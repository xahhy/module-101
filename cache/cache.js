/**
 * cache.js
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

module.exports = new Cache();
