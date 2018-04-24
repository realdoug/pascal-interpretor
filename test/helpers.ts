import { Expect, Test } from "alsatian"
import Lexer from '../src/lexer'
import Parser from '../src/parser'
import Interpreter from "../src/interpreter"

export function interpret(statement) {
  const lexer = new Lexer(statement)
  const parser = new Parser(lexer)
  const interpreter = new Interpreter(parser)
  interpreter.run()
  return interpreter
}