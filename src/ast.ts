import Token from './token'

export class ASTNode {
}

export class Program extends ASTNode {
    name: string
    block: ASTNode

    constructor(name: string, block: ASTNode) {
        super()
        this.name = name
        this.block = block
    }
}

export class Block extends ASTNode {
    declarations: ASTNode[]
    compoundStatement: ASTNode

    constructor(decl: ASTNode[], cs: ASTNode) {
        super()
        this.declarations = decl
        this.compoundStatement = cs
    }
}

export class VarDecl extends ASTNode {
    varNode: ASTNode
    typeNode: ASTNode

    constructor(varNode: ASTNode, type: ASTNode){
        super()
        this.varNode = varNode
        this.typeNode = type
    }
}

export class Type extends ASTNode {
    token: ASTNode

    constructor(token: ASTNode){
        super()
        this.token = token
    }
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

export class Compound extends ASTNode {
    children: ASTNode[]
}

export class Var extends ASTNode {
    token: Token
    value: any

    constructor(token: Token) {
        super()
        this.token = token
        this.value = token.value
    }
}

export class Assign extends ASTNode {
    left: Var
    right: ASTNode
    op: Token

    constructor(left: Var, right: ASTNode, op: Token) {
        super()
        this.left = left
        this.right = right
        this.op = op
    }
}

export class NoOp extends ASTNode {
}