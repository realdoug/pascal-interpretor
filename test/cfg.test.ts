import { Expect, Test } from "alsatian"
import { Lexer, Interpreter } from "../interpreter"

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
  public FactorTest() {
    Expect(expr("100")).toBe(100)
  }

  @Test()
  public TermTest() {
    Expect(expr("100 * 9")).toBe(900)
  }

  @Test()
  public ExprTest() {
    Expect(expr("31 + 100 * 9")).toBe(931)
  }
}
