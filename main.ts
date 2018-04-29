import Interpreter from './src/interpreter'
import Lexer from './src/lexer'
import Parser from './src/parser'

export function run(input) {
    const lexer = new Lexer(input)
    const parser = new Parser(lexer)
    const interpreter = new Interpreter(parser)
    interpreter.run()

    console.log(interpreter.GLOBALSCOPE)
}