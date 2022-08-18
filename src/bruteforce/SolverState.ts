import Var from "../expr/Var";

export class SolverState {
    public readonly variables: Set<Var>;

    constructor(variables: Set<Var>) {
        this.variables = variables;
    }
}