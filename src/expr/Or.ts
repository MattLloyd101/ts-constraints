import Term from "./Term";
import {TermType} from "./TermType";

interface Or extends Term {

}
class OrImpl extends Term implements Or {
    private readonly _terms: Term[];

    constructor(...terms: Term[]) {
        super();
        this._terms = terms;
    }

    type(): TermType {
        return TermType.Or;
    }

    evaluate(): boolean {
        return this.children().some(term => {
            return term.evaluate();
        });
    }

    children(): Term[] {
        return this._terms;
    }
}

const Or = (...terms: Term[]): Or => {
    return new OrImpl(...terms);
}

export default Or;