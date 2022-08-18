import Term from "../expr/Term";
import {SolverState} from "./SolverState";
import Var from "../expr/Var";
import {TermType} from "../expr/TermType";

export default class Solver {

    static prepare(expr: Term): SolverState {
        const variables: Var[] = expr.flatMap((term: Term) => {
            switch (term.type()) {
                case TermType.Var: return [term];
                default: return [];
            }
        }) as Var[];
        return new SolverState(new Set(variables));
    }

}