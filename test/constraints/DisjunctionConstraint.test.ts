import {DisjunctionConstraint} from "../../src/constraints/DisjunctionConstraint";
import {SUDOKU_DOMAIN} from "../Constants";

describe("DisjunctionConstraint", () => {
   test.each([
       [SUDOKU_DOMAIN, [1], [2, 3, 4, 5, 6, 7, 8, 9]],
       [SUDOKU_DOMAIN, [1, 2, 3, 9], [4, 5, 6, 7, 8]],
       [SUDOKU_DOMAIN, [1, 2, 3, 4, 5, 6, 7, 8, 9], []],
       [SUDOKU_DOMAIN, [1, 2, 3, 10], [4, 5, 6, 7, 8, 9]],
       [SUDOKU_DOMAIN, [], [1, 2, 3, 4, 5, 6, 7, 8, 9]],
   ])("It returns the disjunction between the domain and the constraint", (domainValues, values, expected) => {
       const constraint = new DisjunctionConstraint(new Set(values));
       const domain = new Set(domainValues);
       const actual = constraint.apply(domain);

       expect(actual).not.toBeUndefined();
       expect(actual).not.toBeNull();
       expect(actual).toEqual(new Set(expected));
   })
});