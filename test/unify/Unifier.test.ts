import Unifier from "../../src/unify/Unifier";
import Literal, {False, True} from "../../src/expr/Literal";
import UnifierResult, {UnifierResultType} from "../../src/unify/UnifierResult";
import Var from "../../src/expr/Var";
import And from "../../src/expr/And";
import Substitution from "../../src/unify/Substitution";
import Or from "../../src/expr/Or";
import {TermType} from "../../src/expr/TermType";

describe("Unifier", () => {

   describe("if either a or b are variables or literals", () => {
      test("If expressions are identical return UnifierResult.Identical", () => {
         const unifier = new Unifier();
         expect(unifier.unify(True, True)).toBe(UnifierResult.Identical);
      });

      test("If expressions are not unifiable return UnifierResult.Ununifiable", () => {
         const unifier = new Unifier();
         expect(unifier.unify(True, False)).toBe(UnifierResult.Ununifiable);
      });

      test("If a is contained by b then we have an invalid statement. Return UnifierResult.Ununifiable", () => {
         const unifier = new Unifier();
         const a = Var("a");
         const b = And(a, a);
         expect(unifier.unify(a, b)).toBe(UnifierResult.Ununifiable);
      });

      test("If a is not contained by b then we expect a substitution of a for b", () => {
         const unifier = new Unifier();
         const a = Var("a");
         const b = True;
         const out = unifier.unify(a, b);
         expect(out.type).toBe(UnifierResultType.Substitution);
         expect(out.substitutions).toContainEqual(new Substitution(a, b));
      });

      test("If b is contained by a then we have an invalid statement. Return UnifierResult.Ununifiable", () => {
         const unifier = new Unifier();
         const b = Var("b");
         const a = And(b, b);
         expect(unifier.unify(a, b)).toBe(UnifierResult.Ununifiable);
      });

      test("If b is not contained by a then we expect a substitution of a for b", () => {
         const unifier = new Unifier();
         const a = True;
         const b = Var("b");
         const out = unifier.unify(a, b);
         expect(out.type).toBe(UnifierResultType.Substitution);
         expect(out.substitutions).toContainEqual(new Substitution(b, a));
      });
   });
   describe("if neither a or b are variables", () => {
      test("if a and b aren't of the same type then the result is UnifierResult.Ununifiable", () => {
         const unifier = new Unifier();
         const a = And(True, False);
         const b = Or(True, False);
         expect(unifier.unify(a, b)).toBe(UnifierResult.Ununifiable);
      });

      test("if a and b have a different number of arguments then the result is UnifierResult.Ununifiable", () => {
         const unifier = new Unifier();
         const a = And(True);
         const b = And(True, False, True);
         expect(unifier.unify(a, b)).toBe(UnifierResult.Ununifiable);
      });

      test("If any of the sub-expressions fail then the whole statement fails", () => {
         const unifier = new Unifier();
         const a = And(True, True);
         const b = And(True, False);
         expect(unifier.unify(a, b)).toBe(UnifierResult.Ununifiable);
      });

      test("We collate the substitutions and perform the replacement.", () => {
         const unifier = new Unifier();
         const q = Var("q");
         const r = Var("r");
         const a = And(True, q);
         const b = And(r, False);
         const out = unifier.unify(a, b);
         expect(out.type).toBe(UnifierResultType.Substitution);
         expect(out.substitutions).toHaveLength(2);
         expect(out.substitutions).toContainEqual(new Substitution(q, False));
         expect(out.substitutions).toContainEqual(new Substitution(r, True));
         expect(a.children()[1]).toEqual(False);
         expect(b.children()[0]).toEqual(True);
      });

      test("Unify a var and an expression with subexpressions", () => {
         const unifier = new Unifier();
         const q = Var("q");
         const r = Var("r");
         const s = Var("s");
         const orExpr = Or(q, r)
         const a = And(q, False, orExpr);
         const b = And(True, r, s);
         const out = unifier.unify(a, b);
         expect(out.type).toBe(UnifierResultType.Substitution);
         expect(out.substitutions).toHaveLength(3);
         expect(out.substitutions).toContainEqual(new Substitution(q, True));
         expect(out.substitutions).toContainEqual(new Substitution(r, False));
         expect(out.substitutions).toContainEqual(new Substitution(s, orExpr));
         //q
         expect(a.children()[0]).toEqual(True);
         expect(a.children()[2].children()[0]).toEqual(True);
         //r
         expect(b.children()[1]).toEqual(False);
         expect(a.children()[2].children()[1]).toEqual(False);
         //s
         expect(b.children()[2].type()).toEqual(TermType.Or);
         expect(b.children()[2].children()[0]).toEqual(True);
         expect(b.children()[2].children()[1]).toEqual(False);
      });

      test("Unify a var and an expression with subexpressions and backtracking", () => {
         const unifier = new Unifier();
         const q = Var("q");
         const r = Var("r");
         const s = Var("s");
         const orExpr = Or(q, r)
         const a = And(orExpr, q, False);
         const b = And(s, True, r);
         const out = unifier.unify(a, b);
         expect(out.type).toBe(UnifierResultType.Substitution);
         expect(out.substitutions).toHaveLength(3);
         expect(out.substitutions).toContainEqual(new Substitution(q, True));
         expect(out.substitutions).toContainEqual(new Substitution(r, False));
         expect(out.substitutions).toContainEqual(new Substitution(s, orExpr));
         //q
         expect(a.children()[1]).toEqual(True);
         expect(a.children()[0].children()[0]).toEqual(True);
         //r
         expect(b.children()[2]).toEqual(False);
         expect(a.children()[0].children()[1]).toEqual(False);
         //s
         expect(b.children()[0].type()).toEqual(TermType.Or);
         expect(b.children()[0].children()[0]).toEqual(True);
         expect(b.children()[0].children()[1]).toEqual(False);
      });
   });
});