const [INTEGER, PLUS, EOF] = ['INTEGER', 'PLUS', 'EOF'];
const nums = '0123456789';

class Token {
    type: string
    value: any
    constructor(type: string, value: any) {
        this.type = type
        this.value = value
    }
}

class Interpreter {
    text: string
    pos: number
    currentToken: Token

    constructor(text: string) {
        this.text = text
        this.pos = 0
        this.currentToken = null
    }

    error() {
        throw "Error"
    }

    getNextToken(): Token {
        const text = this.text
        if (this.pos > text.length - 1)
            return new Token(EOF, null)

        let currentChar = text[this.pos]
        if (nums.indexOf(currentChar) !== -1) {
            this.pos += 1
            return new Token(INTEGER, parseInt(currentChar))
        }

        if (currentChar === '+') {
            this.pos += 1
            return new Token(PLUS, currentChar)
        }

        this.error()
    }

    eat(tokenType: string) {
        if(this.currentToken.type === tokenType){
            this.currentToken = this.getNextToken()
        }else {
            this.error()
        }
    }

    expr() {
        this.currentToken = this.getNextToken()
        const left = this.currentToken
        this.eat(INTEGER)

        const op = this.currentToken
        this.eat(PLUS)
        
        const right = this.currentToken
        this.eat(INTEGER)

        return left.value + right.value
    }
}

function main() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    rl.setPrompt('calc> ')
    rl.prompt()
    rl.on('line', (inp) => {
        const interpreter = new Interpreter(inp)
        const result = interpreter.expr()

        console.log(result)
        rl.prompt()
    })
}

main()