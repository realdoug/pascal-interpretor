import { Expect, Test } from "alsatian"
import Lexer from '../src/lexer'
import Interpreter from "../src/interpreter"

const expr = statement => {
  const lex = new Lexer(statement)
  const interpreter = new Interpreter(lex)
  return interpreter.expr()
}

export class ExprFixture {
  @Test()
  public SimpleAdditionTest() {
    Expect(expr("1+1")).toBe(2)
  }

  @Test()
  public SimpleSubtractionTest() {
    Expect(expr("1-1")).toBe(0)
  }

  @Test()
  public MultiDigitAdd() {
    Expect(expr("100+87")).toBe(187)
  }

  @Test()
  public MultiDigitSub() {
    Expect(expr("100-87")).toBe(13)
  }

  @Test()
  public FactorSimpleTest() {
    Expect(expr("100")).toBe(100)
  }

  @Test()
  public FactorParenTest() {
    Expect(expr("(1 + 8) * 100")).toBe(900)
  }

  @Test()
  public TermTest() {
    Expect(expr("100 * 9")).toBe(900)
  }

  @Test()
  public ExprTest() {
    Expect(expr("31 + 100 * 9")).toBe(931)
  }

  @Test()
  public ComplexTest() {
    Expect(expr("(20 - 10) + 9 * 10")).toBe(100)
  }}
