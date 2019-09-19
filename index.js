const load = require('./module');
const compile = require('./compile');

const entry = './src/index.js';
const modules = compile(entry);
load(modules, entry);
load(modules, entry);
