import { Expect, Test } from "alsatian"
import { Lexer } from "../interpreter"

export class InterpreterFixture {
  @Test()
  public IntegerTest() {
    const lex = new Lexer("1000")
    const result = lex.integer()

    Expect(result).toBe(1000);
  }
}