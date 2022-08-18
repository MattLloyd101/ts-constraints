import Expr from "./Expr";
import {TermType} from "./TermType";

interface Or extends Expr {

}
class OrImpl extends Expr implements Or {
    constructor(...exprs: Expr[]) {
        super(exprs);
    }

    type(): TermType {
        return TermType.Or;
    }

    evaluate(): boolean {
        return this.children().some(term => {
            return term.evaluate();
        });
    }

}

const Or = (...terms: Expr[]): Or => {
    return new OrImpl(...terms);
}

export default Or;