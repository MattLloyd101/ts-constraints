import {IntersectionConstraint} from "../../src/constraints/IntersectionConstraint";
import {SUDOKU_DOMAIN} from "../Constants";

describe("IntersectionConstraint", () => {

   test.each([
       [SUDOKU_DOMAIN, [1], [1]],
       [SUDOKU_DOMAIN, [1, 2, 3], [1, 2, 3]],
       [SUDOKU_DOMAIN, [1, 2, 3, 10], [1, 2, 3]],
       [SUDOKU_DOMAIN, [10], []],
       [SUDOKU_DOMAIN, [], []]
   ])("It returns the intersection between the domain and the constraint", (domainValues, values, expected) => {
       const constraint = new IntersectionConstraint<Number>(new Set(values));
       const domain = new Set(domainValues);
       const actual = constraint.apply(domain);

       expect(actual).not.toBeUndefined();
       expect(actual).not.toBeNull();
       expect(actual).toEqual(new Set(expected));
   });

});