import { Expect, Test } from "alsatian"
import { Interpreter } from "../interpreter"

export class ExprFixture {

  @Test()
  public SimpleAdditionTest() {
    const interpreter = new Interpreter("1+1")
    const result = interpreter.expr()

    Expect(result).toBe(2);
  }
}