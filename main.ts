import Interpreter from './src/interpreter'
import Lexer from './src/lexer'

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
        const interpreter = new Interpreter(lexer)
        const result = interpreter.expr()

        console.log(result)
        rl.prompt()
    })
}

main()