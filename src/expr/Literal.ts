import Expr from "./Expr";
import {TermType} from "./TermType";

// Literals are not expressions but terms, probably need to change the class hierarchy here.
export default class Literal extends Expr {
    private readonly value: boolean;
    constructor(value: boolean) {
        super([]);
        this.value = value;
    }

    type(): TermType {
        return TermType.Literal;
    }

    evaluate(): boolean {
        return this.value;
    }

    children(): Expr[] {
        return [];
    }

    flatMap<T>(fn: (expr: Expr) => T[]): T[] {
        return fn(this);
    }
}

export const True = new Literal(true);
export const False = new Literal(false);
