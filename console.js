/**
 * add console.js at ther root of your app
 * Modify to make it more helpful for your project
 * > Note: `esm` adds ES6 support in Node
 * In package.json
 *  ...
 *  "scripts": {
 *    "start": "nodemon -r esm ./server.js"
 *    "console": "node -r esm --experimental-repl-await console",
 *  }
 *
 * check whether you have yarn installed
 * $ yarn -v
 * 1.12.3
 * If not then install it using
 * $ npm install -g yarn
 * /usr/local/bin/yarn -> /usr/local/lib/node_modules/yarn/bin/yarn.js
 *  /usr/local/bin/yarnpkg -> /usr/local/lib/node_modules/yarn/bin/yarn.js
 *  + yarn@1.12.3
 * updated 1 package in 1.459s
 *
 * Now you can run command
 * $ yarn console
 * app > // Here we have all sequelize models
 * app > (await User.findOne()).toJSON() // return {..user} json object
 */

let repl = require('repl');
let required_models = require('./models');
const fs = require('fs');

// touch .node_history file if it is not exist
if (!fs.existsSync(process.cwd() + '/.node_history')) {
  console.log('remove & add .node_history');
  fs.closeSync(fs.openSync('.node_history', 'w'));
}

global['app'] = { models: {} };
global['DateFns'] = require('date-fns');
Object.keys(required_models).forEach(modelName => {
  global[modelName] = required_models[modelName];
});

let replServer = repl.start({
  prompt: 'app > '
});

require('repl.history')(replServer, process.cwd() + '/.node_history');
replServer.context.db = required_models;
