export const tokens = {
    INTEGER: 'INTEGER',
    PLUS: 'PLUS',
    MINUS: 'MINUS',
    MUL: 'MUL',
    DIV: 'DIV',
    LPAREN: '(',
    RPAREN: ')',
    EOF: 'EOF',
    BEGIN: 'BEGIN',
    END: 'END',
    DOT: 'DOT',
    ID: 'ID',
    SEMI: ';',
    ASSIGN: ':='
}

export default class Token {
    type: string
    value: any
    constructor(type: string, value: any) {
        this.type = type
        this.value = value
    }
}