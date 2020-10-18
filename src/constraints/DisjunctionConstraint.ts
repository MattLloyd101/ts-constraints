export class DisjunctionConstraint<T> {
    private values: Set<T>;

    constructor(values: Set<T>) {
        this.values = values;
    }

    apply(domain: Set<T>) {
        return new Set<T>([...domain].filter(_ => !this.values.has(_)));
    }
}