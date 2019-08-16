class Module {
  constructor(id, exports = {}) {
    this.id = id;
    this.exports = exports;
  }
}

// src/math.js
function math(module, require) {
  const square = (x) => x * 2;
  const timestamp = Date.now();
  console.log(`load ${module.id}`);
  module.exports = {
    square,
    timestamp,
  };
}

// src/index.js
function index(module, require) {
  const math = require('./math');

  console.log(math.square(2));
  console.log(math.timestamp);

  const __math__ = require('./math');
  console.log(__math__.timestamp);
}
/**
 * Refactor Version
 */
const modules = {
  './math': math,
  './index': index,
};

const load = (modules, entryId) => {
  const __require__ = (id) => {
    const module = new Module(id, {});
    modules[id](module, __require__);
    return module.exports;
  };
  modules[entryId](module, __require__);
};

load(modules, './index');
