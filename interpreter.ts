import { setFlagsFromString } from "v8";

const [INTEGER, PLUS, MINUS, EOF] = ['INTEGER', 'PLUS', 'MINUS', 'EOF'];
const nums = '0123456789';

class Token {
    type: string
    value: any
    constructor(type: string, value: any) {
        this.type = type
        this.value = value
    }
}

export class Interpreter {
    text: string
    pos: number
    currentToken: Token
    currentChar: string // no char type in ts :(

    constructor(text: string) {
        this.text = text
        this.pos = 0
        this.currentToken = null
        this.currentChar = this.text[this.pos]
    }

    error() {
        throw "Parse Error"
    }

    advance() {
        this.pos += 1
        if (this.pos > this.text.length - 1) {
            this.currentChar = null
        } else {
            this.currentChar = this.text[this.pos]
        }
    }

    skipWhitespace() {
        while (this.currentChar === ' ') {
            this.advance()
        }
    }

    integer(): number {
        let result = ''
        while (this.currentChar !== null && !isNaN(parseInt(this.currentChar))) {
            result += this.currentChar
            this.advance()
        }
        return parseInt(result)
    }

    getNextToken(): Token {
        while (this.currentChar !== null) {
            if (this.currentChar === ' ') {
                this.skipWhitespace()
                continue
            }
            if (!isNaN(parseInt(this.currentChar))) {
                return new Token(INTEGER, this.integer());
            }
            if (this.currentChar === '+') {
                this.advance()
                return new Token(PLUS, '+')
            }
            if (this.currentChar == '-') {
                this.advance()
                return new Token(MINUS, '-')
            }

            this.error()
        }
        
        return new Token(EOF, null)
    }

    eat(tokenType: string) {
        if (this.currentToken.type === tokenType) {
            this.currentToken = this.getNextToken()
        } else {
            this.error()
        }
    }

    expr() {
        this.currentToken = this.getNextToken()
        const left = this.currentToken
        this.eat(INTEGER)

        const op = this.currentToken
        if(op.type === PLUS){
            this.eat(PLUS)
        }else {
            this.eat(MINUS)
        }

        const right = this.currentToken
        this.eat(INTEGER)

        if(op.type === PLUS){
            return left.value + right.value
        }else{
            return left.value - right.value
        }
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