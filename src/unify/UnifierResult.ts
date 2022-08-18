import Substitution from "./Substitution";

export enum UnifierResultType {
    Identical,
    Ununifiable,
    Subst
}

export default class UnifierResult {
    static Identical = new UnifierResult([], UnifierResultType.Identical);
    static Ununifiable = new UnifierResult([], UnifierResultType.Ununifiable);

    readonly type: UnifierResultType;
    readonly substitutions: Substitution[];

    constructor(substitutions: Substitution[] = [], type = UnifierResultType.Subst) {
        this.substitutions = substitutions;
        this.type = type;
    }

    join(subExprResult: UnifierResult):UnifierResult {
        if(this.type === UnifierResultType.Ununifiable) return UnifierResult.Ununifiable;
        if(subExprResult.type === UnifierResultType.Ununifiable) return UnifierResult.Ununifiable;

        if(this.type === UnifierResultType.Subst && subExprResult.type === UnifierResultType.Subst) {
            return new UnifierResult(this.substitutions.concat(subExprResult.substitutions));
        }

        if(this.type === UnifierResultType.Subst) {
            return this;
        }

        return subExprResult;
    }
}