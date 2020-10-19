import {Constraint} from "./Constraint";
import {FreeVar} from "../FreeVar";

export class MustContainConstraint<T> implements Constraint<T> {
    private targets: Array<FreeVar<T>>;
    private readonly value: T;
    constructor(targets: Array<FreeVar<T>>, value: T) {
        this.targets = targets;
        this.value = value;

    }

    satisfied(): boolean {
        return this.targets.some(target => target.isFixed && target.fixedValue === this.value );
    }

}