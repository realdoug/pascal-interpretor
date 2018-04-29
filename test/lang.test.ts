import { Expect, Test } from "alsatian"
import { interpret } from './helpers'

export class LangFixture {
    @Test()
    public SimpleProgramTest() {
        const result = interpret(`PROGRAM test; BEGIN END.`)
    }

    @Test()
    public AssignmentTest() {
        const result = interpret(`PROGRAM test; BEGIN a := 1; END.`)
        Expect(result.GLOBALSCOPE['a']).toBe(1)
    }

    @Test()
    public AssignmentWhitespaceTest() {
        const result = interpret(`
        PROGRAM test;
        BEGIN
            a := 1;
        END.`)
        Expect(result.GLOBALSCOPE['a']).toBe(1)
    }


    @Test()
    public NestedTest() {
        const result = interpret(`
            PROGRAM test1; BEGIN BEGIN END; END.
         `)
        const size = Object.keys(result.GLOBALSCOPE).length
        Expect(size).toBe(0)
    }

    @Test()
    public NestedWhitespaceTest() {
        const result = interpret(`
            PROGRAM Test1;
            BEGIN 
                BEGIN
                END; 
            END.`)
        const size = Object.keys(result.GLOBALSCOPE).length
        Expect(size).toBe(0)
    }

    @Test()
    public VarTest() {
        const result = interpret(`
            PROGRAM Test1;
            VAR
                a : INTEGER;
            BEGIN 
                BEGIN
                END; 
            END.`)
        const size = Object.keys(result.GLOBALSCOPE).length
        Expect(size).toBe(0)
    }

    @Test()
    public FullProgramTest() {
        const result = interpret(`
            PROGRAM Part10;
            VAR
            number     : INTEGER;
            a, b, c, x : INTEGER;
            y          : REAL;

            BEGIN {Part10}
            BEGIN
                number := 2;
                a := number;
                b := 10 * a + 10 * number DIV 4;
                c := a - - b
            END;
            x := 11;
            y := 20 / 7 + 3.14;
            { writeln('a = ', a); }
            { writeln('b = ', b); }
            { writeln('c = ', c); }
            { writeln('number = ', number); }
            { writeln('x = ', x); }
            { writeln('y = ', y); }
            END.  {Part10}
        `)
    }
}