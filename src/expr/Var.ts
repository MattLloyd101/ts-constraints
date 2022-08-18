import Term from "./Term";
import {TermType} from "./TermType";

interface Var extends Term {
    readonly ident: String
}

class VarImpl extends Term implements Var {
    public readonly ident: String;
    constructor(ident: String) {
        super();
        this.ident = ident;
    }

    type(): TermType {
        return TermType.Var;
    }

    evaluate(): boolean {
        throw new Error(`Found variable (${this.ident}) on evaluation, expected a literal`);
    }

    equals(term: Var): boolean {
        return this.ident == term.ident;
    }

    children(): Term[] {
        return [];
    }

    flatMap<T>(fn: (term: Term) => T[]): T[] {
        return fn(this);
    }
}

const Var = (ident: String) => {
    return new VarImpl(ident);
}

export default Var;