class Calculator {
    constructor (currentContainer, previousContainer){
        this.currentContainer = currentContainer
        this.previousContainer = previousContainer
        this.clear()
    }
    
    clear() {
        this.current = ''
        this.previous = ''
        this.operator = undefined
    }

    delete() {
        this.current = this.current.toString().slice(0, -1)
    }

    appendNum(number) {
        if (number === '.' && this.current.includes('.')) return
        this.current = this.current.toString() + number.toString()
    }

    chooseOperator(operator) {
        if (this.current === '') return
        if (this.previous !== '') {
          this.compute()
        }
        this.operator = operator
        this.previous = this.current
        this.current = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previous)
        const curr = parseFloat(this.current)
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operator) {
            case '+':
                computation = prev + curr
                break
            case '–':
                computation = prev - curr
                break
            case '×':
                computation = prev * curr
                break
            case '÷':
                computation = prev / curr
                break
            default:
                return
        }
        this.current = computation
        this.operator = undefined
        this.previous = ''
    }

    getDisplayNum(number) {
        const stringNum = number.toString()
        const integer = parseFloat(stringNum.split('.')[0])
        const decimal = stringNum.split('.')[1]
        let integerDisplay
        if (isNaN(integer)) {
          integerDisplay = ''
        } else {
          integerDisplay = integer.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimal != null) {
          return `${integerDisplay}.${decimal}`
        } else {
          return integerDisplay
        }
    }

    updateDisplay() {
        this.currentContainer.innerText =
            this.getDisplayNum(this.current)
        if (this.operator != null) {
          this.previousContainer.innerText =
              `${this.getDisplayNum(this.previous)} ${this.operator}`
        } else {
          this.previousContainer.innerText = ''
        }
    }
}

const numberBtn = document.querySelectorAll('[data-num]')
const operatorBtn = document.querySelectorAll('[data-op]')
const clearBtn = document.querySelector('[data-clearAll]')
const equals = document.querySelector('[data-equals]')
const delBtn = document.querySelector('[data-delete]')
const previousContainer = document.querySelector('[data-previous]')
const currentContainer = document.querySelector('[data-current]')

const calculator = new Calculator(previousContainer, currentContainer)

numberBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText)
        calculator.updateDisplay()
    })
})

operatorBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperator(button.innerText)
        calculator.updateDisplay()
    })
})

equals.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

clearBtn.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

delBtn.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})