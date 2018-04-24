import { Expect, Test } from "alsatian"
import { interpret } from './helpers'

function compute(expression) {
  const program = `BEGIN foo := ${expression} END.`
  return interpret(program).GLOBALSCOPE['foo']
}

export class ExprFixture {
  @Test()
  public SimpleAdditionTest() {
    Expect(compute("1+1")).toBe(2)
  }

  @Test()
  public SimpleSubtractionTest() {
    Expect(compute("1-1")).toBe(0)
  }

  @Test()
  public MultiDigitAdd() {
    Expect(compute("100+87")).toBe(187)
  }

  @Test()
  public MultiDigitSub() {
    Expect(compute("100-87")).toBe(13)
  }

  @Test()
  public FactorSimpleTest() {
    Expect(compute("100")).toBe(100)
  }

  @Test()
  public FactorParenTest() {
    Expect(compute("(1 + 8) * 100")).toBe(900)
  }

  @Test()
  public TermTest() {
    Expect(compute("100 * 9")).toBe(900)
  }

  @Test()
  public computeTest() {
    Expect(compute("31 + 100 * 9")).toBe(931)
  }

  @Test()
  public ComplexTest() {
    Expect(compute("(20 - 10) + 9 * 10")).toBe(100)
  }

  @Test()
  public UnaryTest() {
    Expect(compute("+-1")).toBe(-1)
  }
}
