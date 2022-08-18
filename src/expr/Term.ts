import {TermType} from "./TermType";

export default abstract class Term {
    abstract children(): Term[];

    abstract evaluate(): boolean;

    abstract type(): TermType;

    flatMap<T>(fn: (term: Term) => T[]): T[] {
        return this.children().reduce((out: T[], _: Term) => {
            const ts = _.flatMap(fn);
            return out.concat(ts);
        }, []);
    }
}