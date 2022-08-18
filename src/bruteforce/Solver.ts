import Expr from "../expr/Expr";
import {SolverState} from "./SolverState";
import Var from "../expr/Var";
import {TermType} from "../expr/TermType";

export default class Solver {

    static prepare(expr: Expr): SolverState {
        const variables: Var[] = expr.flatMap((term: Expr) => {
            switch (term.type()) {
                case TermType.Var: return [term];
                default: return [];
            }
        }) as Var[];
        return new SolverState(new Set(variables));
    }

}