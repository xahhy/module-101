const fs = require('fs');
const path = require('path');
const RequireModuleRegExp = /\W?require\((['"])(.*?)(\1)\)/;

const findFile = (cwd, filePath) => {
  const suffixes = ['.js', '.json', '/index.js'];
  for (let index = 0; index < suffixes.length; index++) {
    const fullPath = path.join(cwd, `${filePath}${suffixes[index]}`);
    try {
      if (fs.existsSync(fullPath)) {
        return fullPath;
      }
    } catch (error) {}
  }
  throw Error(`Can not find module: ${filePath}`);
};

module.exports = (filePath) => {
  const modules = {};

  const compile = (filePath) => {
    let fileSource = fs.readFileSync(filePath);
    const lines = fileSource.toString().split('\n');
    fileSource = lines
      .map((line) => {
        const result = line.match(RequireModuleRegExp);
        if (result) {
          const modulePath = result[2];
          if (modulePath.startsWith('.')) {
            const cwd = path.dirname(filePath);
            const subModuleFullPath = `./${findFile(cwd, modulePath)}`;
            compile(subModuleFullPath);
            return line.replace(modulePath, subModuleFullPath);
          }
        }
        return line;
      })
      .join('\n');
    modules[filePath] = function(module, require) {
      eval(fileSource);
    };
  };

  compile(filePath);
  return modules;
};
