import Token, {
    INTEGER, PLUS, MINUS, MUL, DIV, EOF
} from './token'
import Lexer from './lexer'
import Parser from './parser'
import { ASTNode, BinaryOp, Num } from './ast'

export default class Interpreter {
    parser: Parser

    constructor(parser: Parser) {
        this.parser = parser
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

    visit_BinaryOp(node: BinaryOp) {
        const visit = this.visit.bind(this) // sad sad javascript
        switch (node.op.type) {
            case PLUS:
                return visit(node.left) + visit(node.right)
            case MINUS:
                return visit(node.left) - visit(node.right)
            case MUL:
                return visit(node.left) * visit(node.right)
            case DIV:
                return visit(node.left) / visit(node.right)
        }
    }

    visit_Num(node: Num) {
        return node.value
    }

    run(): number {
        const tree = this.parser.parse()
        return this.visit(tree)
    }
}
