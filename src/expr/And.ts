import Expr from "./Expr";
import {TermType} from "./TermType";

interface And extends Expr {

}
class AndImpl extends Expr implements And  {
    constructor(...exprs: Expr[]) {
        super(exprs);
    }

    type(): TermType {
        return TermType.And;
    }

    evaluate(): boolean {
        return this.children().every(term => {
            return term.evaluate();
        });
    }

}

const And = (...exprs: Expr[]): And => {
    return new AndImpl(...exprs);
}

export default And;