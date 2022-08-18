import Var from "../expr/Var";
import Expr from "../expr/Expr";

export default class Substitution {

    substituion: Expr;
    v: Var;

    constructor(v: Var, substitution: Expr) {
        this.v = v;
        this.substituion = substitution;
    }
}