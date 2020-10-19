import {Constraint} from "./Constraint";
import {FreeVar} from "../FreeVar";

export class SumConstraint<Number> implements Constraint<Number> {
    constructor(group: Array<FreeVar<Number>>, number: number) {

    }

    satisfied(): boolean {
        return false;
    }

}