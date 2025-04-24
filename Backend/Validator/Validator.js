class Validator {
    static cyrillicLetters = new Set(Array.from(
        'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'
    ))

    static latinLetters = new Set(Array.from(
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    ))

    static numbers = new Set(Array.from(
        '0123456789'
    ))

    static assortmentTypes = new Set([
        'Мясо', 'Салаты', 'Овощи', 'Выпечка', 'Молочка'
    ])

    static unitsOfMeasurement = new Set([
        'г', 'кг', 'шт'
    ])

    static feedbackTypes = new Set([
        'Положительный', 'Нейтральный', 'Негативный'
    ])

    static isId(id) {
        if (!id) {
            return false
        }
        try {
            id = BigInt(id)
            return id > 0
        } catch (e) {
            return false
        }
    }

    static cyrillicOnly(text) {
        if (!text || typeof text !== "string") {
            return false
        }
        Array.from(text).forEach(letter => {
            if (!(letter in this.cyrillicLetters)) {
                return false
            }
        })
        return true
    }

    static isPhoneNumber(phoneNumber) {
        if (!phoneNumber || typeof phoneNumber !== "string" || phoneNumber.length !== 12) {
            return false
        }
        let firstThreeChars = Array.from(phoneNumber.slice(0, 3))
        let secondChars = Array.from(phoneNumber.slice(3, phoneNumber.length - 1))
        if (firstThreeChars[0] !== '+' || firstThreeChars[1] !== '7' || firstThreeChars[2] !== '9') {
            return false
        }
        secondChars.forEach(char => {
            if (!char in this.numbers) {
                return false
            }
        })
        return true
    }

    //Доработать
    static isAddress(address) {
        if (!address || typeof address !== "string") {
            return false
        }
        return true
    }
    //Доработать

    static isPassword(password) {
        if (!password || typeof password !== "string") {
            return false
        }
        return password.length >= 6
    }

    static isDoubleMoreZero(potDouble) {
        if (!potDouble) {
            return false
        }
        try {
            potDouble = parseFloat(potDouble)
            return potDouble > 0
        } catch (e) {
            return false
        }
    }

    static isBoolean(potBoolean) {
        if (!potBoolean) {
            return false
        }
        return potBoolean === 'true' || potBoolean === 'false'
    }

    static isCyrillicWithSpaces(text) {
        if (!text || typeof text !== "string") {
            return false
        }
        Array.from(text).forEach(letter => {
            if (!(letter in this.cyrillicLetters) && letter !== ' ') {
                return false
            }
        })
        return true
    }

    //ХЗ???
    static isFile(file) {
        if (!file) {
            return false
        }
        return true
    }
    //ХЗ???

    static isIntegerMoreZero(potInteger) {
        if (!potInteger) {
            return false
        }
        try {
            potInteger = parseInt(potInteger)
            return potInteger > 0
        } catch (e) {
            return false
        }
    }

    static isString(text) {
        if (!text) {
            return false
        }
        return typeof text === "string"
    }

    //Доделать
    static isDateTime(dateTime) {
        if (!dateTime) {
            return false
        }
        return true
    }
    //Доделать

    static assortmentType(assortmentType) {
        if (!assortmentType) {
            return false
        }
        return assortmentType in this.assortmentTypes
    }

    static isUnitOfMeasurement(unit) {
        if (!unit) {
            return false
        }
        return unit in this.unitsOfMeasurement
    }

    static isFeedbackType(type) {
        if (!type) {
            return false
        }
        return type in this.feedbackTypes
    }

    static isEmail(email) {
        if (!email || typeof email !== "string") {
            return false
        }
        let re = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i
        return re.test(email)
    }
}

module.exports = Validator