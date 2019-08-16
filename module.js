class Module {
  constructor(id, exports = {}) {
    this.id = id;
    this.exports = exports;
  }
}

// src/math.js
// 1. Compile (wrap with a function)
function math(module, require) {
  const square = (x) => x * 2;
  module.exports = {
    square,
  };
}
// 2. Create Module
const mathModule = new Module('math', {});
// 3. Load Module (Run the function)
math(mathModule);
console.log(mathModule);

// src/index.js
// 4. Compile
function index(module, require) {
  const math = require('./math');

  console.log(math.square(2));
}
// 5. Load Module
const indexModule = new Module('index', {});
// 6. Require Another Module
const __require__ = (id) => {
  return mathModule.exports;
};
// 7. Load Modules
index(indexModule, __require__);
