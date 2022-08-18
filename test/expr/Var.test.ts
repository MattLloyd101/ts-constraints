import Var from "../../src/expr/Var";

describe("Var", () => {
    describe("evaluate", () => {
        it("throws an exception when attempting to evaluate", () => {
            const a = Var("a");
            expect(() => { a.evaluate() }).toThrow("Found variable (a) on evaluation, expected a literal");
        });
    });

    describe("equals", () => {
        it("maintains that two separate instances are structurally equal if they have the same ident", () => {
            const a = Var("a");
            const a2 = Var("a");
            expect(a.equals(a2)).toBeTruthy();
            expect(a2.equals(a)).toBeTruthy();
        });

        it("maintains that two separate instances are not structurally equal if they have different idents", () => {
            const a = Var("a");
            const b = Var("b");
            expect(a.equals(b)).toBeFalsy();
            expect(b.equals(a)).toBeFalsy();
        });
    });
});