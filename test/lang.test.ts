import { Expect, Test } from "alsatian"
import { interpret } from './helpers'

export class LangFixture {
    @Test()
    public SimpleProgramTest() {
        const result = interpret(`BEGIN END.`)
    }

    @Test()
    public AssignmentTest() {
        const result = interpret(`BEGIN a := 1; END.`)
        Expect(result.GLOBALSCOPE['a']).toBe(1)
    }

    @Test()
    public AssignmentWhitespaceTest() {
        const result = interpret(`BEGIN
            a := 1;
        END.`)
        Expect(result.GLOBALSCOPE['a']).toBe(1)
    }


    @Test()
    public NestedTest() {
        const result = interpret(`BEGIN BEGIN END; END.`)
    }
    
    @Test()
    public NestedWhitespaceTest() {
        const result = interpret(`BEGIN 
            BEGIN
            END; 
        END.`)
    }

    // @Test()
    // public NestedProgramTest() {
    //     const result = interpret(`
    //     BEGIN
    //         BEGIN
    //             number := 2;
    //             a := number;
    //             b := 10 * a + 10 * number / 4;
    //             c := a - - b
    //         END;
    //         x := 11;
    //     END.`)
    //     Expect(result['number']).toBe(2)
    //     Expect(result['b']).toBe(10)
    //     Expect(result['x']).toBe(11)
    // }
}