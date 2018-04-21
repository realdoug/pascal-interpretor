import Token, {
    INTEGER, PLUS, MINUS, MUL, DIV, LPAREN, RPAREN, EOF
} from './token'
import Lexer from './lexer'

export default class Interpreter {
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
        // factor :  INTEGER | LPAREN expr RPAREN
        const token = this.currentToken
        switch(token.type) {
            case INTEGER:
                this.eat(INTEGER)
                return token.value
            case LPAREN:
                this.eat(LPAREN)
                const result = this.expr()
                this.eat(RPAREN)
                return result
        }
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
