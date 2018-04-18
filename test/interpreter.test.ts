import { Expect, Test } from "alsatian"
import { Interpreter } from "../interpreter"

export class InterpreterFixture {

  @Test()
  public IntegerTest() {
    const interpreter = new Interpreter("1000")
    const result = interpreter.integer()

    Expect(result).toBe(1000);
  }
}