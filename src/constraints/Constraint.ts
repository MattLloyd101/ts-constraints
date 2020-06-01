import ConstraintType from "./ConstraintType";

export default interface Constraint {
    type: ConstraintType;
    satisfiedBy<T>(value: T): boolean;
}