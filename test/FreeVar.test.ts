import {SUDOKU_DOMAIN} from "../src/Constants";
import {FreeVar} from "../src/FreeVar";
import {Constraint} from "../src/constraints/Constraint";

const domain = new Set(SUDOKU_DOMAIN);
const ident = "id";

describe("FreeVar", () => {
    test("has a domain and ident", () => {
      const freeVar = new FreeVar(ident, domain);

      expect(freeVar.domain).toEqual(domain);
      expect(freeVar.ident).toEqual(ident);
    });

    describe("isFixed", () => {
        test("returns true if the domain only has a single value", () => {
            const freeVar = new FreeVar(ident, new Set([1]));
            expect(freeVar.isFixed).toBeTruthy();
        });
        test("returns false if the domain has more than a single value", () => {
            const freeVar = new FreeVar(ident, new Set([1, 2]));
            expect(freeVar.isFixed).toBeFalsy();
        });
    });

    describe("fixedValue", () => {
        test("returns the Value if the domain has a single value", () => {
            const freeVar = new FreeVar(ident, new Set([1]));
            expect(freeVar.fixedValue).toEqual(1);
        });
        test("returns undefined if the domain has more than a single value", () => {
            const freeVar = new FreeVar(ident, new Set([1, 2]));
            expect(freeVar.fixedValue).toBeUndefined();
        });
    });
});
