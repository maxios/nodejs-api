const requireAll = require('require-all');
const chalk = require('chalk');
const models = require('../../../models');

module.exports = function (app) {
  require('lumber-forestadmin').run(app, {
    modelsDir: __dirname + '/../../../models',
    envSecret: process.env.FOREST_ENV_SECRET || "a50a6cd44c86e6085d3487ccb995a5e44798338b3929d0442c575bf7af03e405",
    authSecret: process.env.FOREST_AUTH_SECRET || "eyJraWQiOiJ6d0VjbU5LVVpVTkdYUnlNRzZ2QUoyTTVfYzBoZGhfblBXS0hYWjhGUTFBIiwiYWxnIjoiUlMyNTYifQ.eyJkYXRhIjp7ImRhdGEiOnsidHlwZSI6InVzZXJzIiwiaWQiOiIyOTEyOSIsImF0dHJpYnV0ZXMiOnsiZmlyc3RfbmFtZSI6Ik1vaGFtZWQiLCJsYXN0X25hbWUiOiJBYmR1bHRhd2FiIiwiZW1haWwiOiJzaGVpa2hhbGFtb3VkdGVjaEBnbWFpbC5jb20ifX19LCJpc0FwcGxpY2F0aW9uVG9rZW4iOnRydWUsImF1ZCI6IkZPUkVTVF9VU0VSUyIsImlzcyI6IkZPUkVTVF9BVVRIRU5USUNBVElPTl9TWVNURU0iLCJpYXQiOjE2MjU3NjQ3MjYsImV4cCI6NDc4MTUyNDcyNn0.l-Hnx9XZfC_pn717EppRqVUapGd_WfMLuhR9XgKQze2sGZXU4C9zhGJo0v8vl6wkZ1a2b61CSrCN2p9OI0hBmBiK7ZToSZsSNxx4PlZPajJkqwCKdwCbkVdhWzNcHjTh8EA6M_nUH332XIEPBKuH_9PawNa5XSCF3gR_QPipuqUkfN7tXpKiqBuwLd2dp8GNFk2iPiij1AEHLVML3YGKf7MCm5mYCwKxUsq-Xct9gEwZGUTFgmNykelKjzT0MKR_5v7t_mgzOKBBAs7vd9m4SnjyKnHvCv10ntbh9R62RiOyoAKDwxkgif1Xm6aIuu0z32KuhUbfR3gucz63uvA8Cg",
    sequelize: models.sequelize,
  });

  requireAll({
    dirname: __dirname + '/../../routes',
    recursive: true,
    resolve: Module => app.use('/forest', Module)
  });

  console.log(chalk.cyan('Your admin panel is available here: https://app.forestadmin.com/projects'));
};
