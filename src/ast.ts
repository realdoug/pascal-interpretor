import Token from './token'

export class ASTNode {
}

export class UnaryOp extends ASTNode {
    token: Token
    op: Token
    expr: ASTNode

    constructor(op: Token, expr: ASTNode) {
        super()
        this.token = op
        this.op = op
        this.expr = expr
    }
}

export class BinaryOp extends ASTNode {
    left: ASTNode
    op: Token
    right: ASTNode
    
    constructor(left: ASTNode, op: Token, right: ASTNode) {
        super()
        this.left = left
        this.op = op
        this.right = right
    }
}

export class Num extends ASTNode {
    token: Token
    value: any

    constructor(token: Token) {
        super()
        this.token = token
        this.value = token.value
    }
}