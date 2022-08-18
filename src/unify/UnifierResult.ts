import Substitution from "./Substitution";

export enum UnifierResultType {
    Identical= "Identical",
    Ununifiable = "Ununifiable",
    Substitution = "Substitution"
}

export default class UnifierResult {
    static Identical = new UnifierResult([], UnifierResultType.Identical);
    static Ununifiable = new UnifierResult([], UnifierResultType.Ununifiable);

    readonly type: UnifierResultType;
    readonly substitutions: Substitution[];

    constructor(substitutions: Substitution[] = [], type = UnifierResultType.Substitution) {
        this.substitutions = substitutions;
        this.type = type;
    }

    join(subExprResult: UnifierResult):UnifierResult {
        if(this.type === UnifierResultType.Ununifiable) return UnifierResult.Ununifiable;
        if(subExprResult.type === UnifierResultType.Ununifiable) return UnifierResult.Ununifiable;

        if(this.type === UnifierResultType.Substitution && subExprResult.type === UnifierResultType.Substitution) {
            return new UnifierResult(this.substitutions.concat(subExprResult.substitutions));
        }

        if(this.type === UnifierResultType.Substitution) {
            return this;
        }

        return subExprResult;
    }
}