import Token, { tokens } from './token'
const {
    INTEGER, PLUS, MINUS, MUL, DIV,
    LPAREN, RPAREN, EOF, BEGIN, END, ID,
    ASSIGN, SEMI, DOT
} = tokens
import { isAlnum, isAlpha, isDigit } from './util'

const reserved = {
    'BEGIN': new Token(BEGIN, 'BEGIN'),
    'END': new Token(END, 'END')
}

function isWhitespace(str) {
    return /\s/.test(str)
}

export default class Lexer {
    text: string
    pos: number
    currentChar: string

    constructor(text: string) {
        this.text = text
        this.pos = 0
        this.currentChar = this.text[this.pos]
    }

    singleCharToken(type: string, value: string) {
        this.advance()
        return new Token(type, value)
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
        while (isWhitespace(this.currentChar)) {
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

    identifier() {
        let result = ''
        while (this.currentChar !== null && isAlnum(this.currentChar)) {
            result += this.currentChar
            this.advance()
        }
        return reserved[result] ? reserved[result] : new Token(ID, result)
    }

    error() {
        throw "Invalid Character"
    }

    peek() {
        const peekTo = this.pos + 1
        if (peekTo > this.text.length - 1) {
            return null
        } else {
            return this.text[peekTo]
        }
    }

    getNextToken(): Token {
        while (this.currentChar !== null) {
            if (isWhitespace(this.currentChar)) {
                this.skipWhitespace()
                continue
            }

            if (this.currentChar !== null && !isNaN(parseInt(this.currentChar)))
                return new Token(INTEGER, this.integer())

            if (isAlpha(this.currentChar))
                return this.identifier()

            if (this.currentChar === ':' && this.peek() === '=') {
                this.advance()
                this.advance()
                return new Token(ASSIGN, ':=')
            }

            if (this.currentChar === '+')
                return this.singleCharToken(PLUS, '+');

            if (this.currentChar === '-')
                return this.singleCharToken(MINUS, '-')

            if (this.currentChar === '*')
                return this.singleCharToken(MUL, '*')

            if (this.currentChar === '/')
                return this.singleCharToken(DIV, '/')

            if (this.currentChar === '(')
                return this.singleCharToken(LPAREN, '(')

            if (this.currentChar === ')')
                return this.singleCharToken(RPAREN, ')')

            if (this.currentChar === ';')
                return this.singleCharToken(SEMI, ';')

            if (this.currentChar === '.')
                return this.singleCharToken(DOT, '.')

            this.error()
        }

        return new Token(EOF, null)
    }
}