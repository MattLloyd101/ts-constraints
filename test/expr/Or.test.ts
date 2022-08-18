import Or from "../../src/expr/Or";
import {False, True} from "../../src/expr/Literal";

describe("Or", () => {
    describe("evaluate", () => {
        it("returns true when it contains one true literal", () => {
            const expr = Or(True);
            expect(expr.evaluate()).toBeTruthy();
        });

        it("returns true when it contains at least true literal", () => {
            const expr = Or(True, True);
            expect(expr.evaluate()).toBeTruthy();
        });

        it("returns true when it contains one true literal among false literals", () => {
            const expr1 = Or(False, True);
            expect(expr1.evaluate()).toBeTruthy();

            const expr2 = Or(True, False);
            expect(expr2.evaluate()).toBeTruthy();
        });
    });
});