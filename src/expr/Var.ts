import Expr from "./Expr";
import {TermType} from "./TermType";

// Vars are not expressions but terms, probably need to change the class hierarchy here.
interface Var extends Expr {
    readonly ident: String
}

class VarImpl extends Expr implements Var {
    public readonly ident: String;
    constructor(ident: String) {
        super([]);
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

    children(): Expr[] {
        return [];
    }

    flatMap<T>(fn: (expr: Expr) => T[]): T[] {
        return fn(this);
    }
}

const Var = (ident: String) => {
    return new VarImpl(ident);
}

export default Var;