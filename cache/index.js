/**
 * index.js
 */
const cache = require('./cache');

cache.set('name', 'hhy');
console.log(cache.get('name'));
