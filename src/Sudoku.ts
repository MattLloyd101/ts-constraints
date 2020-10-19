import {FreeVar} from "./FreeVar";
import {SUDOKU_DOMAIN, SUDOKU_DOMAIN_VALUES} from "./Constants";
import {Constraint} from "./constraints/Constraint";
import {MustContainConstraint} from "./constraints/MustContainConstraint";
import {SumConstraint} from "./constraints/SumConstraint";

function flatten<T>(arr: Array<Array<T>>) {
    return arr.reduce((acc, val) => acc.concat(val), []);
}

export class Sudoku {

    rows: Array<Array<FreeVar<Number>>> = [];
    cols: Array<Array<FreeVar<Number>>> = [];
    boxs: Array<Array<FreeVar<Number>>> = [];
    grid: Array<FreeVar<Number>>;

    constructor() {
        this.grid = [];
        for (let y = 0; y < 9; y++) {
            const col = [];
            for (let x = 0; x < 9; x++) {
                const freeVar = new FreeVar(`${y + 1}-${x + 1}`, SUDOKU_DOMAIN);
                this.grid.push(freeVar);
                col.push(freeVar);
                this.rows[x] = this.rows[x] || [];
                this.rows[x][y] = freeVar;
            }
            this.cols.push(col);
        }

        const ROW_LENGTH = 9;
        for (let n = 0; n < 9; n++) {
            const row = (n % 3) * 3;
            const col = Math.floor(n / 3) * 3;
            this.boxs[n] = [
                this.grid[row + (col * ROW_LENGTH)], this.grid[row + (col * ROW_LENGTH) + 1], this.grid[row + (col * ROW_LENGTH) + 2],
                this.grid[row + ((col + 1) * ROW_LENGTH)], this.grid[row + ((col + 1) * ROW_LENGTH) + 1], this.grid[row + ((col + 1) * ROW_LENGTH) + 2],
                this.grid[row + ((col + 2) * ROW_LENGTH)], this.grid[row + ((col + 2) * ROW_LENGTH) + 1], this.grid[row + ((col + 2) * ROW_LENGTH) + 2],
            ];
        }
    }

    initConstraintsFor(group: Array<FreeVar<Number>>):Array<Constraint<Number>> {
        const mustContainConstraints = SUDOKU_DOMAIN_VALUES.map(number => [
            new MustContainConstraint(group, number)
        ]);

        return flatten(mustContainConstraints)
            .concat([
                // new SumConstraint(group, 45)
            ]);
    }

    initConstraints() {
        const constraints: Array<Constraint<Number>>[] = [];
        for (let n = 0; n < 9; n++) {
            const row = this.row(n);
            const col = this.col(n);
            const box = this.box(n);
            const rowConstraints = this.initConstraintsFor(row);
            const colConstraints = this.initConstraintsFor(col);
            const boxConstraints = this.initConstraintsFor(box);
            constraints.concat(rowConstraints);
            constraints.concat(colConstraints);
            constraints.concat(boxConstraints);
        }
        return constraints;
    }

    row(n: number): Array<FreeVar<Number>> {
        return this.rows[n];
    }

    col(n: number): Array<FreeVar<Number>> {
        return this.cols[n];
    }

    box(n: number): Array<FreeVar<Number>> {
        return this.boxs[n];
    }
}