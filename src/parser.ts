import Token, { tokens } from './token'
const {
    INTEGER_CONST, REAL_CONST, PLUS, MINUS,
    MUL, INTEGER_DIV, FLOAT_DIV, LPAREN,
    RPAREN, EOF, DOT, BEGIN, END, SEMI, ID,
    ASSIGN, VAR, COMMA, COLON, PROGRAM, INTEGER,
    REAL
} = tokens
import Lexer from './lexer'
import {
    Num, BinaryOp, ASTNode, UnaryOp,
    Compound, NoOp, Var, Assign,
    Block, Type, VarDecl, Program
} from './ast';

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
            throw `EAT ERROR. expected ${tokenType} found ${this.currentToken.type}`
        }
    }

    program(): ASTNode {
        // program : PROGRAM variable SEMI block DOT
        this.eat(PROGRAM)
        const name = this.variable()
        this.eat(SEMI)
        const block = this.block()
        const node = new Program(name.value, block)
        this.eat(DOT)
        return node
    }

    block(): ASTNode {
        // block : declarations compound_statement
        const declarationNodes = this.declarations()
        const compoundStatementNode = this.compoundStatement()
        return new Block(declarationNodes, compoundStatementNode)
    }

    declarations(): ASTNode[] {
        // declarations : VAR (variable_decl SEMI)+ | empty
        let declarations = []
        if (this.currentToken.type === VAR) {
            this.eat(VAR)
            while (this.currentToken.type === ID) {
                const varDec = this.variableDeclaration()
                declarations = declarations.concat(varDec)
                this.eat(SEMI)
            }
        }

        return declarations
    }

    variableDeclaration(): ASTNode[] {
        // variable_decl : ID (COMMA ID)* COLON type_spec
        const nodes = [new Var(this.currentToken)]
        this.eat(ID)
        while (this.currentToken.type === COMMA) {
            this.eat(COMMA)
            nodes.push(new Var(this.currentToken))
            this.eat(ID)
        }

        this.eat(COLON)
        const typeSpec = this.typeSpec()
        return nodes.map(n => new VarDecl(n, typeSpec))
    }

    typeSpec(): ASTNode {
        // type_spec : INTEGER | REAL
        const token = this.currentToken
        if (token.type === INTEGER) {
            this.eat(INTEGER)
        } else {
            this.eat(REAL)
        }

        return new Type(token)
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
        while (this.currentToken.type === SEMI) {
            this.eat(SEMI)
            results.push(this.statement())
        }

        if (this.currentToken.type === ID)
            this.error();

        return results
    }

    statement(): ASTNode {
        // statement : compount_statement | assignment_statement | empty
        let node;
        switch (this.currentToken.type) {
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
        /* factor :  (PLUS | MINUS) factor 
                   | INTEGER_CONST 
                   | REAL_CONST
                   | LPAREN expr RPAREN 
                   | variable */
        const token = this.currentToken
        switch (token.type) {
            case PLUS:
                this.eat(PLUS)
                return new UnaryOp(token, this.factor())
            case MINUS:
                this.eat(MINUS)
                return new UnaryOp(token, this.factor())
            case INTEGER_CONST:
                this.eat(INTEGER_CONST)
                return new Num(token)
            case REAL_CONST:
                this.eat(REAL_CONST)
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
        // term : factor ((MUL | INTEGER_DIV | FLOAT_DIV) factor)*
        let node = this.factor()

        while ([MUL, FLOAT_DIV, INTEGER_DIV].indexOf(this.currentToken.type) > -1) {
            const token = this.currentToken
            switch (token.type) {
                case MUL:
                    this.eat(MUL); break;
                case INTEGER_DIV:
                    this.eat(INTEGER_DIV); break;
                case FLOAT_DIV:
                    this.eat(FLOAT_DIV); break;
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
            switch (token.type) {
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
        if (this.currentToken.type !== EOF)
            this.error();
        return p
    }
}