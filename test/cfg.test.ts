import { Expect, Test } from "alsatian"
import { Interpreter } from "../interpreter"

const expr = statement => {
  const interpreter = new Interpreter(statement)
  return interpreter.expr()
}
export class ExprFixture {

  @Test()
  public SimpleAdditionTest() {
    const result = expr("1+1")
    Expect(result).toBe(2)
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
}
