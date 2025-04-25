const {Sequelize} = require('sequelize') // Инициализация секвалайзера

//Подключение к бд
module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // для Railway
    },
  },
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)
