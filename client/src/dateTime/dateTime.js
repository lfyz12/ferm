export default class OurDateTime {
    /**
     * Загружаем время из дб, а дальше используем геттеры
     * @param {string} utcTimeStampFromDB 
     */
    constructor(utcTimeStampFromDB) {
        this.dateTime = this.parseDateTimeFromDB(utcTimeStampFromDB)
    }

    /**
     * 
     * @returns Дата, соответствующая часовому поясу пользователя в формате DD:MM:YYYY
     */
    getStringDate() {
        var day = this.dateTime.getDate() < 10 ? '0' + this.dateTime.getDate() : this.dateTime.getDate()
        var month = this.dateTime.getMonth() < 10 ? '0' + this.dateTime.getMonth() : this.dateTime.getMonth()
        return `${day}:${month}:${this.dateTime.getFullYear()}`
    }

    /**
     * 
     * @returns Время, соответствующее часовому поясу пользователя в формате HH:MM
     */
    getStringTime() {
        var hours = this.dateTime.getHours() < 10 ? '0' + this.dateTime.getHours() : this.dateTime.getHours()
        var minutes = this.dateTime.getMinutes() < 10 ? '0' + this.dateTime.getMinutes() : this.dateTime.getMinutes()
        return `${hours}:${minutes}`
    }

    /**
     * 
     * @returns Дата и время, соответствующие часовому поясу пользователя в формате DD:MM:YYYY HH:MM
     */
    getStringDateTime() {
        return `${this.getStringDate()} ${this.getStringTime()}`
    }

    /**
     * Системный метод, парсит время из бд к времени того типа, который использует JS
     * Вряд ли тебе понадобится. Если нужно получить дату и/или время, используй геттеры, там всё готово
     * @param {string} utcTimeStampFromDB 
     * @returns {Date}
     */
    parseDateTimeFromDB(utcTimeStampFromDB) {
        var splitDateTime = utcTimeStampFromDB.split('T')
        var date = splitDateTime[0], time = splitDateTime[1].split('.')[0]
        var splitDate = date.split('-'), splitTime = time.split(':')
        var year = Number(splitDate[0]), month = Number(splitDate[1]), day = Number(splitDate[2])
        var hours = Number(splitTime[0]), minutes = Number(splitTime[1])
        return new Date(`${month}/${day}/${year} ${hours}:${minutes}:00 UTC`)
    }
}