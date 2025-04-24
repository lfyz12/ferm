const nodemailer = require('nodemailer')
const {User} = require('../models/models')
const ApiError = require('../error/ApiError')

class smsController {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '89221449094dg@gmail.com',
            pass: 'legxbdjmletzkzmo'
        }
    })

    generateCode = (length) => {
        let result = ''
        const characters = '0123456789'
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }

    //Регистрация
    async sendCode(number, code) {
        try {
            await this.transporter.sendMail({
                from: '"Gnom" <89221449094dg@gmail.com>',
                to: number,
                subject: 'Код для доступа к сайту Уральский',
                text: `Ваш код: ${code}`
            })
        } catch (e) {
            console.log(e)
        }
    }

    //Смена пароля
    async sendCodeJSON(req, res, next) {
        try {
            const {number} = req.body
            const user = await User.findOne({where: {number: number}})
            if (!user) {
                return res.json({message: "Пользователь не найден"})
            }
            let code = generateCode(5)
            await this.transporter.sendMail({
                from: '"Gnom" <89221449094dg@gmail.com>',
                to: number,
                subject: 'Код для доступа к сайту Уральский',
                text: `Ваш код: ${code}`
            })
            await User.update({activatedCode: code}, {where: {number: number}})
            return res.json({message: "Код отправлен"})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new smsController()