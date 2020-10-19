import {Constraint} from "./constraints/Constraint";

export class FreeVar<T> {
    domain: Set<T>;
    ident: string;
    constraints: Array<Constraint<T>> = [];

    constructor(ident: string, domain: Set<T>) {
        this.domain = domain;
        this.ident = ident;
    }

    get isFixed(): boolean {
        return this.domain.size === 1;
    }

    get fixedValue(): T {
        return this.isFixed ? this.domain.values().next().value : undefined;
    }
}