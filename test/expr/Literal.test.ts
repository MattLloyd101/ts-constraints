import Literal from "../../src/expr/Literal"

describe("Literal", () => {
    describe("evaluate", () => {
        it('returns true when constructed with true',  () => {
            const a = new Literal(true);
            expect(a.evaluate()).toBeTruthy();
        });
        it('returns false when constructed with false',  () => {
            const a = new Literal(false);
            expect(a.evaluate()).toBeFalsy();
        });
    });
});