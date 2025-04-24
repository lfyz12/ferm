export default class PhoneInputMask {
    /**
     * Очищает номер от всех символов, кроме цифр
     * @param number
     * @returns {*}
     */
    getInputNumbersValue(number) {
        return number.replace(/\D/g, '')
    }

    formatNumberToBackend(number) {
        return "+" + this.getInputNumbersValue(number)
    }

    /**
     *  let updateArray = (predicate, firstElement, secondElement) => {
     *             if (predicate) {
     *                 arrayNumber.push(firstElement)
     *                 numbersCount++
     *             }
     *             else {
     *                 arrayNumber.push(secondElement)
     *                 spaceCount++
     *                 numbersCount = 0
     *             }
     *         }
     *
     */

    createMask(number) {
        let spaceCount = 0
        let numbersCount = 0
        let arrayNumber = []
        let currentIndex = 0

        while (currentIndex < number.length) {
            if (spaceCount === 0) {
                if (currentIndex === 0 && number[currentIndex] === '7' || number[currentIndex] === '8') {
                    arrayNumber.push("+7 (")
                    spaceCount++
                    currentIndex++
                    continue
                }
                arrayNumber.push("+7 (")
                arrayNumber.push(number[currentIndex])
                currentIndex++
                spaceCount++
                numbersCount++
            }
            else if (spaceCount === 1) {
                if (numbersCount < 3) {
                    arrayNumber.push(number[currentIndex])
                    currentIndex++
                    numbersCount++
                    continue
                }
                arrayNumber.push(') ')
                spaceCount++
                numbersCount = 0
            }
            else if (spaceCount === 2) {
                if (numbersCount < 3) {
                    arrayNumber.push(number[currentIndex])
                    currentIndex++
                    numbersCount++
                    continue
                }
                arrayNumber.push('-')
                spaceCount++
                numbersCount = 0
            }
            else if (spaceCount === 3) {
                if (numbersCount < 2) {
                    arrayNumber.push(number[currentIndex])
                    currentIndex++
                    numbersCount++
                    continue
                }
                arrayNumber.push('-')
                spaceCount++
                numbersCount = 0
            }
            else {
                if (numbersCount < 2) {
                    arrayNumber.push(number[currentIndex])
                    currentIndex++
                    numbersCount++
                    continue
                }
                break
            }
        }
        return arrayNumber.join('')
    }

    formatNumberToClient(number) {
        return this.createMask(this.getInputNumbersValue(number))
    }
}