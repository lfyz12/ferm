require('dotenv').config() //Подключение к окружению
const express = require('express') //Подключение фреймворка
const sequelize = require('./db')  //Подключение к бд
const models = require('./models/models') //Инициализация бд
const cors = require('cors') //Импорт cors
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const PORT = process.env.PORT || 8080 //Инициализация порта
const app = express() //Объект приложения
const errorHandler = require('./middleware/ErrorHandlingMiddleware') //Инициализация еррорхендлера
const path = require('path')
const cookieParser = require('cookie-parser')
const webSocketController = require('./webSockets/webSocketController')

const allowedOrigin = "https://front-g41u.vercel.app"

const corsOptions ={
  origin: 'https://front-g41u.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(cookieParser())
app.use(express.json())  //Это чтобы приложение могло парсить json формат
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

//Обработка ошибок, последний Middleware
//!!!РЕГИСТРИРУЕТСЯ ОБЯЗАТЕЛЬНО В САМОМ КОНЦЕ!!!
app.use(errorHandler)

const server = require('http').createServer(app)


//Запуск сервера
const start = async () => {
    try {
       await sequelize.authenticate()
    .then(() => {
        console.log('✅ Успешное подключение к БД');
    })
    .catch(err => {
        console.error('❌ Ошибка подключения к БД:', err);
    });
        await sequelize.sync()
       
        server.listen(PORT, '0.0.0.0', () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()
