import Token, {
    INTEGER, PLUS, MINUS, MUL, DIV, LPAREN, RPAREN, EOF
} from './token'
import Lexer from './lexer'
import { Num, BinaryOp, ASTNode } from './ast';

export default class Parser {
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

    factor(): ASTNode {
        // factor :  INTEGER | LPAREN expr RPAREN
        const token = this.currentToken
        switch(token.type) {
            case INTEGER:
                this.eat(INTEGER)
                return new Num(token)
            case LPAREN:
                this.eat(LPAREN)
                const node = this.expr()
                this.eat(RPAREN)
                return node
        }
    }

    term(): ASTNode {
        // term : factor ((MUL | DIV) factor)*
        let node = this.factor()

        while ([MUL, DIV].indexOf(this.currentToken.type) > -1) {
            const token = this.currentToken
            switch(token.type){
                case MUL:
                    this.eat(MUL); break;
                case DIV:
                    this.eat(DIV); break;
            }
            node = new BinaryOp(node, token, this.factor())

        }

        return node
    }


    expr(): ASTNode {
        // expr : term ((PLUS | MINUS) term)*

        let node = this.term()
        while ([PLUS, MINUS].indexOf(this.currentToken.type) > -1) {
            const token = this.currentToken
            switch(token.type){
                case PLUS:
                    this.eat(PLUS); break;
                case MINUS:
                    this.eat(MINUS); break;
            } 

            node = new BinaryOp(node, token, this.term())
        }
        return node
    }

    parse(): ASTNode {
        return this.expr()
    }
}