import { Expect, Test } from "alsatian"
import Lexer from "../src/lexer"
import { tokens } from "../src/token"

export class InterpreterFixture {
  @Test()
  public IntegerTest() {
    const lex = new Lexer("1000")
    const result = lex.integer()

    Expect(result).toBe(1000);
  }

  @Test()
  public WhitespaceTest() {
    const lex = new Lexer("   1000    ")
    const result = lex.getNextToken()

    Expect(result.value).toBe(1000);
  }

  @Test()
  public WhitespaceComplexTest() {
    const lex = new Lexer(`   
      1000    `)
    const result = lex.getNextToken()

    Expect(result.value).toBe(1000);
  }

  @Test()
  public AssignTest() {
    const lex = new Lexer(":=")
    const result = lex.getNextToken()

    Expect(result.type).toBe(tokens.ASSIGN);
  }  
}