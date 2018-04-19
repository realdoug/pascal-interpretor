const [INTEGER, PLUS, MINUS, MUL, DIV, EOF] = ['INTEGER', 'PLUS', 'MINUS', 'MUL', 'DIV', 'EOF'];

class Token {
    type: string
    value: any
    constructor(type: string, value: any) {
        this.type = type
        this.value = value
    }
}

export class Lexer {
    text: string
    pos: number
    currentChar: string // no char type in ts :(

    constructor(text: string) {
        this.text = text
        this.pos = 0
        this.currentChar = this.text[this.pos]
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

    error() {
        throw "Invalid Character"
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
            if (this.currentChar === '*') {
                this.advance()
                return new Token(MUL, '*')
            }
            if (this.currentChar == '/') {
                this.advance()
                return new Token(DIV, '/')
            }

            this.error()
        }

        return new Token(EOF, null)
    }
}

export class Interpreter {
    currentToken: Token
    lexer: Lexer

    constructor(lexer: Lexer) {
        this.lexer = lexer
        this.currentToken = this.lexer.getNextToken()
    }

    error() {
        throw "Parse Error"
    }

    eat(tokenType: string) {
        if (this.currentToken.type === tokenType) {
            this.currentToken = this.lexer.getNextToken()
        } else {
            this.error()
        }
    }

    factor() {
        // factor :  INTEGER
        const token = this.currentToken
        this.eat(INTEGER)
        return token.value
    }

    term(): number {
        // term : factor ((MUL | DIV) factor)*
        let result = this.factor()

        while ([MUL, DIV].indexOf(this.currentToken.type) > -1) {
            const token = this.currentToken
            if (token.type === MUL) {
                this.eat(MUL)
                result = result * this.factor()
            } else if (token.type === DIV) {
                this.eat(DIV)
                result = result / this.factor()
            }
        }

        return result
    }


    expr(): number {
        // expr : term ((PLUS | MINUS) term)*

        let result = this.term()
        while ([PLUS, MINUS].indexOf(this.currentToken.type) > -1) {
            const token = this.currentToken
            if (token.type === PLUS) {
                this.eat(PLUS)
                result = result + this.term()
            } else if (token.type === MINUS) {
                this.eat(MINUS)
                result = result - this.term()
            }
        }
        return result
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
        const lexer = new Lexer(inp)
        const interpreter = new Interpreter(lexer)
        const result = interpreter.expr()

        console.log(result)
        rl.prompt()
    })
}

main()