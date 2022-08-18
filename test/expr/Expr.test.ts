import And from "../../src/expr/And";
import Var from "../../src/expr/Var";
import Substitution from "../../src/unify/Substitution";
import {False, True} from "../../src/expr/Literal";
import Or from "../../src/expr/Or";

describe("Expr", () => {
    describe("applySubstitutions", () => {
        test("apply simple Substitution", () => {
            const a = Var("a");
            const substs = [new Substitution(a, True)]
            const expr = And(a);
            const out = expr.applySubstitutions(substs);
            expect(out.children()).toContain(True);
        });

        test("apply multiple Substitution", () => {
            const a = Var("a");
            const substs = [new Substitution(a, True)]
            const expr = And(a, a);
            const out = expr.applySubstitutions(substs);
            expect(out.children()).toHaveLength(2);
            expect(out.children()[0]).toEqual(True);
            expect(out.children()[1]).toEqual(True);
        });

        test("apply multiple Substitution 2", () => {
            const a = Var("a");
            const b = Var("b");
            const substs = [new Substitution(a, True), new Substitution(b, False),]
            const expr = And(a, b);
            const out = expr.applySubstitutions(substs);
            expect(out.children()).toHaveLength(2);
            expect(out.children()[0]).toEqual(True);
            expect(out.children()[1]).toEqual(False);
        });

        test("apply nested Substitution", () => {
            const a = Var("a");
            const b = Var("b");
            const substs = [new Substitution(a, True), new Substitution(b, False),]
            const expr = And(a, Or(a, b));
            const out = expr.applySubstitutions(substs);
            expect(out.children()).toHaveLength(2);
            expect(out.children()[0]).toEqual(True);
            const orExpr = out.children()[1];
            expect(orExpr.children()).toHaveLength(2);
            expect(orExpr.children()[0]).toEqual(True);
            expect(orExpr.children()[1]).toEqual(False);
        });
    });
});