export const tokens = {
    INTEGER: 'INTEGER',
    REAL: 'REAL',
    INTEGER_CONST: 'INTEGER_CONST',
    REAL_CONST: 'REAL_CONST',
    PLUS: 'PLUS',
    MINUS: 'MINUS',
    MUL: 'MUL',
    INTEGER_DIV: 'INTEGER_DIV',
    FLOAT_DIV: 'FLOAT_DIV',
    LPAREN: 'LPAREN',
    RPAREN: 'RPAREN',
    EOF: 'EOF',
    BEGIN: 'BEGIN',
    END: 'END',
    DOT: 'DOT',
    ID: 'ID',
    SEMI: 'SEMI',
    ASSIGN: 'ASSIGN',
    COLON: 'COLON',
    COMMA: 'COMMA',
    VAR: 'VAR',
    PROGRAM: 'PROGRAM'
}

export default class Token {
    type: string
    value: any
    constructor(type: string, value: any) {
        this.type = type
        this.value = value
    }
}