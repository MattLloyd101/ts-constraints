import {False, True} from "../../src/expr/Literal";
import And from "../../src/expr/And";

describe("And", () => {
    describe("evaluate", () => {
        it("returns true when it contains one true literal", () => {
            const expr = And(True);
            expect(expr.evaluate()).toBeTruthy();
        });

        it("returns true when it contains all true literals", () => {
            const expr = And(True, True);
            expect(expr.evaluate()).toBeTruthy();
        });

        it("returns false when it contains one true literal among false literals", () => {
            const expr1 = And(False, True);
            expect(expr1.evaluate()).toBeFalsy();

            const expr2 = And(True, False);
            expect(expr2.evaluate()).toBeFalsy();
        });
    });
});