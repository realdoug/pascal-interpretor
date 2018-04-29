import Token, { tokens } from './token'
const {
    INTEGER_CONST, PLUS, MINUS, MUL, INTEGER_DIV,
    FLOAT_DIV, LPAREN, RPAREN, EOF, BEGIN, END, ID,
    ASSIGN, SEMI, DOT, REAL_CONST, COLON, COMMA,
    VAR, PROGRAM, REAL, INTEGER
} = tokens
import { isAlnum, isAlpha } from './util'

const reserved = {
    'BEGIN': new Token(BEGIN, 'BEGIN'),
    'END': new Token(END, 'END'),
    'PROGRAM': new Token(PROGRAM, 'PROGRAM'),
    'VAR': new Token(VAR, 'VAR'),
    'REAL': new Token(REAL, 'REAL'),
    'DIV': new Token(INTEGER_DIV, 'DIV'),
    'INTEGER': new Token(INTEGER, 'INTEGER')
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

    skipComment() {
        while (this.currentChar !== '}') {
            this.advance()
        }
        this.advance()
    }

    number(): Token {
        let result = ''
        let isFloat = false
        while (
            this.currentChar !== null &&
            (!isNaN(parseInt(this.currentChar)) || this.currentChar === '.')
        ) {
            if (this.currentChar === '.') isFloat = true;
            result += this.currentChar
            this.advance()
        }

        return isFloat ?
            new Token(REAL_CONST, parseFloat(result)) :
            new Token(INTEGER_CONST, parseInt(result))

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

            if (this.currentChar === '{') {
                this.advance()
                this.skipComment()
                continue
            }

            if (this.currentChar !== null && !isNaN(parseInt(this.currentChar)))
                return this.number()

            if (isAlpha(this.currentChar))
                return this.identifier()

            if (this.currentChar === ':' && this.peek() === '=') {
                this.advance()
                this.advance()
                return new Token(ASSIGN, ':=')
            }

            if (this.currentChar === ':') 
                return this.singleCharToken(COLON, ':')

            if (this.currentChar === ',') 
                return this.singleCharToken(COMMA, ',')

            if (this.currentChar === '+')
                return this.singleCharToken(PLUS, '+')

            if (this.currentChar === '-')
                return this.singleCharToken(MINUS, '-')

            if (this.currentChar === '*')
                return this.singleCharToken(MUL, '*')

            if (this.currentChar === '/')
                return this.singleCharToken(FLOAT_DIV, '/')

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