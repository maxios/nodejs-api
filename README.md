public api for sheikh alamoud official website

Setup:

      npm i
      npm i -g sequelize-cli
      sequelize db:create
      sequelize db:migrate

ORM console:

      cd <PROJECT_ROOT_PATH>
      node console.js


ORM console usage:

  fetch all data:

      MODEL.findAll({raw: true}).then(console.log).catch(console.log)

  create record:

      Model.create({<attributes written here>}).then(console.log).catch(console.log)
