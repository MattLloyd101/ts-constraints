import Term from "./Term";
import {TermType} from "./TermType";

export default class Literal extends Term {
    private readonly value: boolean;
    constructor(value: boolean) {
        super();
        this.value = value;
    }

    type(): TermType {
        return TermType.Literal;
    }

    evaluate(): boolean {
        return this.value;
    }

    children(): Term[] {
        return [];
    }

    flatMap<T>(fn: (term: Term) => T[]): T[] {
        return fn(this);
    }
}

export const True = new Literal(true);
export const False = new Literal(false);
