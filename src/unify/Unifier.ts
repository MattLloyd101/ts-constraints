import UnifierResult from "./UnifierResult";
import {TermType} from "../expr/TermType";
import Expr from "../expr/Expr";
import Var from "../expr/Var";
import Substitution from "./Substitution";


export default class Unifier {

    private exprContainsVariable(expr: Expr, v: Var): boolean {
        return expr.any(expr => expr === v);
    }

    unify(a: Expr, b: Expr): UnifierResult {
        if(a === b) {
            return UnifierResult.Identical;
        }

        const aIsVar = a.type() === TermType.Var;
        const bIsVar = b.type() === TermType.Var;
        if (aIsVar || bIsVar || a.type() === TermType.Literal || b.type() === TermType.Literal) {
            if(aIsVar) {
                if (this.exprContainsVariable(b, a as Var)) {
                    return UnifierResult.Ununifiable;
                } else {
                    return new UnifierResult([new Substitution(a as Var, b)]);
                }
            }
            else if (bIsVar) {
                if(this.exprContainsVariable(a, b as Var)) {
                    return UnifierResult.Ununifiable;
                } else {
                    return new UnifierResult([new Substitution(b as Var, a)]);
                }
            }
            else {
                return UnifierResult.Ununifiable;
            }
        }

        if(a.type() !== b.type()) {
            return UnifierResult.Ununifiable;
        }

        const aChildren = a.children();
        const bChildren = b.children();

        if(aChildren.length !== bChildren.length) {
            return UnifierResult.Ununifiable;
        }

        const result = aChildren.reduce((out, aChild, i) => {
            const bChild = bChildren[i];
            const subExprResult = this.unify(aChild, bChild);
            return out.join(subExprResult);
        }, UnifierResult.Identical);

        a.applySubstitutions(result.substitutions);
        b.applySubstitutions(result.substitutions);

        return result;
    }
}