import Term from "./Term";
import {TermType} from "./TermType";

interface And extends Term {

}
class AndImpl extends Term implements And  {
    private readonly _terms: Term[];
    constructor(...terms: Term[]) {
        super();
        this._terms = terms;
    }

    type(): TermType {
        return TermType.And;
    }

    evaluate(): boolean {
        return this._terms.every(term => {
            return term.evaluate();
        });
    }

    children(): Term[] {
        return this._terms;
    }

}

const And = (...terms: Term[]): And => {
    return new AndImpl(...terms);
}

export default And;