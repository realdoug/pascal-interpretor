import Interpreter from './src/interpreter'
import Lexer from './src/lexer'
import Parser from './src/parser'

function main() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    rl.setPrompt('calc> ')
    rl.prompt()
    rl.on('line', (inp) => {
        const lexer = new Lexer(inp)
        const parser = new Parser(lexer)
        const interpreter = new Interpreter(parser)
        interpreter.run()

        console.log(interpreter.GLOBALSCOPE)
        rl.prompt()
    })
}

main()