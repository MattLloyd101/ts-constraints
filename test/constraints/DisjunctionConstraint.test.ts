import {DisjunctionConstraint} from "../../src/constraints/DisjunctionConstraint";
import {SUDOKU_DOMAIN} from "../Constants";

describe("DisjunctionConstraint", () => {
   test.each([
       [SUDOKU_DOMAIN, [1], [2, 3, 4, 5, 6, 7, 8, 9]]
   ])("It returns the disjunction between the domain and the constraint", (domainValues, values, expected) => {
       const disjunctionConstraint = new DisjunctionConstraint(new Set(values));

       const domain = new Set(domainValues);
       const actual = disjunctionConstraint.apply(domain);

       expect(actual).not.toBeUndefined();
       expect(actual).not.toBeNull();
       expect(actual).toEqual(new Set(expected));
   })
});