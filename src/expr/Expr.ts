import {TermType} from "./TermType";
import Substitution from "../unify/Substitution";

export default abstract class Expr {
    protected _children: Expr[];

    constructor(children: Expr[]) {
        this._children = children;
    }

    children(): Expr[] {
        return this._children;
    }

    abstract evaluate(): boolean;

    abstract type(): TermType;

    flatMap<T>(fn: (expr: Expr) => T[]): T[] {
        return this.children().reduce((out: T[], _: Expr) => {
            const ts = _.flatMap(fn);
            return out.concat(ts);
        }, []);
    }

    any(fn: (expr: Expr) => boolean): boolean {
        return fn(this) ? true : this.children().reduce((out: boolean, child: Expr) => {
            return out || child.any(fn);
        }, false);
    }

    applySubstitutions(substitutions: Substitution[]): Expr {
        this._children = this.children().reduce((out, child) => {
            const subst = substitutions.find((subst:Substitution) => subst.v === child);
            if(subst) {
                return out.concat([subst.substituion]);
            }

            return out.concat([child.applySubstitutions(substitutions)]);
        }, [] as Expr[]);

        return this;
    }
}