import {MustContainConstraint} from "../../src/constraints/MustContainConstraint";
import {FreeVar} from "../../src/FreeVar";



describe("MustContainConstraint", () => {
    describe("satisfied", () => {
        test("returns true if any of the targets are the value", () => {
            const domain = new Set([1, 2, 3]);
            const fixedValue = new Set([1]);
            const freeVars = [
                new FreeVar("a", domain),
                new FreeVar("b", domain),
                new FreeVar("c", fixedValue),
            ];

            const constraint = new MustContainConstraint(freeVars, 1);

            expect(constraint.satisfied()).toBeTruthy();
        });

        test("returns false if none of the targets are the value", () => {
            const domain = new Set([1, 2, 3]);
            const fixedValue = new Set([2]);
            const freeVars = [
                new FreeVar("a", domain),
                new FreeVar("b", domain),
                new FreeVar("c", fixedValue),
            ];

            const constraint = new MustContainConstraint(freeVars, 1);

            expect(constraint.satisfied()).toBeFalsy();
        });
    });
});