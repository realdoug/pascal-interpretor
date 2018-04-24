import Token, { tokens } from './token'
const { 
    INTEGER, PLUS, MINUS, MUL, DIV, 
    LPAREN, RPAREN, EOF, DOT, BEGIN, END,
    SEMI, ID, ASSIGN
} = tokens
import Lexer from './lexer'
import { Num, BinaryOp, ASTNode, UnaryOp, Compound, NoOp, Var, Assign } from './ast';

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

    program(): ASTNode {
        // program : compound_statement DOT
        const node = this.compoundStatement()
        this.eat(DOT)
        return node
    }

    compoundStatement(): ASTNode {
        // compound_statement : BEGIN statement_list END
        this.eat(BEGIN)
        const nodes = this.statementList()
        this.eat(END)

        const root = new Compound()
        root.children = nodes

        return root
    }

    statementList(): ASTNode[] {
        // statement_list : statement | statement SEMI statement_list
        const node = this.statement()
        const results = [node]
        while(this.currentToken.type === SEMI) {
            this.eat(SEMI)
            results.push(this.statement())
        }

        if(this.currentToken.type === ID)
            this.error();
        
        return results
    }

    statement(): ASTNode {
        // statement : compount_statement | assignment_statement | empty
        let node;
        switch(this.currentToken.type) {
            case BEGIN:
                node = this.compoundStatement();
                break;
            case ID:
                node = this.assignmentStatement();
                break;
            default:
                node = this.empty()
        } 

        return node
    }

    assignmentStatement(): ASTNode {
        // assignment_statement : variable ASSIGN expr
        const left = this.variable()
        const token = this.currentToken
        this.eat(ASSIGN)
        const right = this.expr()
        return new Assign(left, right, token)
    }

    variable(): Var {
        // variable : ID
        const node = new Var(this.currentToken)
        this.eat(ID)
        return node
    }

    empty(): ASTNode {
        return new NoOp()
    }

    factor(): ASTNode {
        // factor :  (PLUS | MINUS) factor | INTEGER | LPAREN expr RPAREN | VARIABLE
        const token = this.currentToken
        switch(token.type) {
            case PLUS:
                this.eat(PLUS)
                return new UnaryOp(token, this.factor())
            case MINUS:
                this.eat(MINUS)
                return new UnaryOp(token, this.factor())
            case INTEGER:
                this.eat(INTEGER)
                return new Num(token)
            case LPAREN:
                this.eat(LPAREN)
                const node = this.expr()
                this.eat(RPAREN)
                return node
            default: 
                return this.variable()
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
        const p = this.program()
        if(this.currentToken.type !== EOF)
            this.error();
        return p
        // return this.expr()
    }
}