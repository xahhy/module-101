class Module {
  constructor(id, exports = {}) {
    this.id = id;
    this.exports = exports;
  }
}

// src/math.js
function math(module, require) {
  const square = (x) => x * 2;
  module.exports = {
    square,
  };
}
const mathModule = new Module('math', {});
math(mathModule);
console.log(mathModule);

// src/index.js
function index(module, require) {
  const math = require('./math');

  console.log(math.square(2));
}
const indexModule = new Module('index', {});
const __require__ = (id) => {
  return mathModule.exports;
};
index(indexModule, __require__);
