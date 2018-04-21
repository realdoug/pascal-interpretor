export const [
    INTEGER, PLUS, MINUS, MUL, DIV, LPAREN, RPAREN, EOF
] = ['INTEGER', 'PLUS', 'MINUS', 'MUL', 'DIV', '(', ')', 'EOF'];

export default class Token {
    type: string
    value: any
    constructor(type: string, value: any) {
        this.type = type
        this.value = value
    }
}