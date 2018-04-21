import Token, {
    INTEGER, PLUS, MINUS, MUL, DIV, LPAREN, RPAREN, EOF
} from './token'

export default class Lexer {
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
            if (this.currentChar == '(') {
                this.advance()
                return new Token(LPAREN, '(')
            }
            if (this.currentChar == ')') {
                this.advance()
                return new Token(RPAREN, ')')
            }

            this.error()
        }

        return new Token(EOF, null)
    }
}