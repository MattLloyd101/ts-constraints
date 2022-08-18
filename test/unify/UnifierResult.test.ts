import UnifierResult, {UnifierResultType} from "../../src/unify/UnifierResult";
import Unifier from "../../src/unify/Unifier";
import Substitution from "../../src/unify/Substitution";
import {False, True} from "../../src/expr/Literal";
import Var from "../../src/expr/Var";

describe("UnifierResult", () => {
    test("Identical & Ununifiable are not equal to each other", () => {
        expect(UnifierResult.Identical).not.toEqual(UnifierResult.Ununifiable);
    });

    describe("join", () => {
        test("Join should return Identical with ID & ID", () => {
            expect(UnifierResult.Identical.join(UnifierResult.Identical)).toEqual(UnifierResult.Identical);
        });

        test("Join should return Subst with ID & Subst", () => {
            const subst = new Substitution(Var("a"), True);
            const out = UnifierResult.Identical.join(new UnifierResult([subst]));
            expect(out.type).toEqual(UnifierResultType.Substitution);
            expect(out.substitutions).toHaveLength(1);
            expect(out.substitutions).toContainEqual(subst);
        });

        test("Join should return Subst with Subst & ID", () => {
            const subst = new Substitution(Var("a"), True);
            const out = new UnifierResult([subst]).join(UnifierResult.Identical);
            expect(out.type).toEqual(UnifierResultType.Substitution);
            expect(out.substitutions).toHaveLength(1);
            expect(out.substitutions).toContainEqual(subst);
        });

        test("Join should return Subst with Subst & Subst and merge substitutions", () => {
            const subst1 = new Substitution(Var("a"), True);
            const subst2 = new Substitution(Var("b"), False);
            const out = new UnifierResult([subst1]).join(new UnifierResult([subst2]));
            expect(out.type).toEqual(UnifierResultType.Substitution);
            expect(out.substitutions).toHaveLength(2);
            expect(out.substitutions).toContainEqual(subst1);
            expect(out.substitutions).toContainEqual(subst2);
        });

        test("Join should return Ununifiable with ID & Ununifiable", () => {
            expect(UnifierResult.Identical.join(UnifierResult.Ununifiable)).toEqual(UnifierResult.Ununifiable);
        });

        test("Join should return Ununifiable with Ununifiable & ID", () => {
            expect(UnifierResult.Ununifiable.join(UnifierResult.Identical)).toEqual(UnifierResult.Ununifiable);
        });

        test("Join should return Ununifiable with Subst & Ununifiable", () => {
            const subst = new Substitution(Var("a"), True);
            const out = new UnifierResult([subst]).join(UnifierResult.Ununifiable);
            expect(out.type).toEqual(UnifierResultType.Ununifiable);
            expect(out.substitutions).toHaveLength(0);
        });
        test("Join should return Ununifiable with Ununifiable & Subst", () => {
            const subst = new Substitution(Var("a"), True);
            const out = UnifierResult.Ununifiable.join(new UnifierResult([subst]));
            expect(out.type).toEqual(UnifierResultType.Ununifiable);
            expect(out.substitutions).toHaveLength(0);
        });
    });
})