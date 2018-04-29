import Token, { tokens } from './token'
const {
    PLUS, MINUS, MUL, INTEGER_DIV, FLOAT_DIV,
    LPAREN, RPAREN, EOF
} = tokens
import Lexer from './lexer'
import Parser from './parser'
import {
    ASTNode, BinaryOp, UnaryOp,
    Num, NoOp, Compound, Assign,
    Var, Program, Block, VarDecl, Type
} from './ast'

export default class Interpreter {
    parser: Parser
    GLOBALSCOPE: {}

    constructor(parser: Parser) {
        this.parser = parser
        this.GLOBALSCOPE = {}
    }

    visit(node: ASTNode) {
        const methodName = 'visit_' + node.constructor.name
        const specificVisit = this[methodName].bind(this)
        if (specificVisit !== undefined) {
            return specificVisit(node)
        } else {
            throw `No method implemented: ${methodName}`
        }
    }

    visit_Program(node: Program) {
        this.visit(node.block)
    }

    visit_Block(node: Block) {
        const visit = this.visit.bind(this)
        node.declarations.forEach(dec => visit(dec))
        visit(node.compoundStatement)
    }

    visit_VarDecl(node: VarDecl){
    }

    visit_Type(node: Type){
    }

    visit_UnaryOp(node: UnaryOp) {
        const visit = this.visit.bind(this)
        const op = node.op.type
        switch (node.op.type) {
            case PLUS:
                return +visit(node.expr)
            case MINUS:
                return -visit(node.expr)
        }
    }

    visit_BinaryOp(node: BinaryOp) {
        const visit = this.visit.bind(this) // sad sad javascript
        switch (node.op.type) {
            case PLUS:
                return visit(node.left) + visit(node.right)
            case MINUS:
                return visit(node.left) - visit(node.right)
            case MUL:
                return visit(node.left) * visit(node.right)
            case INTEGER_DIV:
                return visit(node.left) / visit(node.right)
            case FLOAT_DIV:
                return visit(node.left) / visit(node.right)
        }
    }

    visit_Num(node: Num) {
        return node.value
    }

    visit_Compound(node: Compound) {
        node.children.forEach(n => this.visit(n))
    }

    visit_Assign(node: Assign) {
        const varName = node.left.token.value
        this.GLOBALSCOPE[varName] = this.visit(node.right)
    }

    visit_Var(node: Var) {
        const varName = node.value
        const val = this.GLOBALSCOPE[varName]
        if (val === null || val === undefined)
            throw `Name Error: ${varName}`;

        return val
    }

    visit_NoOp(node: NoOp) {
    }

    run(): number {
        const tree = this.parser.parse()
        return this.visit(tree)
    }
}
