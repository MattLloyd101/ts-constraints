import Solver from "../../src/bruteforce/Solver";
import {True} from "../../src/expr/Literal";
import And from "../../src/expr/And";
import Var from "../../src/expr/Var";
import Or from "../../src/expr/Or";

const a = Var("a");
const b = Var("b");
const c = Var("c");
const d = Var("d");

describe("Solver", () => {
    describe("prepare", () => {
        it("prepares a solver state", () => {
            const expr = True;
            expect(Solver.prepare(expr)).not.toBeNull();
        });
        it("collates a list of unique variables in the expr", () => {
            const expr = And(
                a,
                Or(b, c),
                And(d, Or(True, a)),
                True
            );

            const actual = Solver.prepare(expr);
            expect(actual).not.toBeNull();
            expect(actual.variables).toContain(a);
            expect(actual.variables).toContain(b);
            expect(actual.variables).toContain(c);
            expect(actual.variables).toContain(d);
            expect(actual.variables).not.toContain(True);
        });
    });
});