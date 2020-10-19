import {Sudoku} from "../src/Sudoku";
import {FreeVar} from "../src/FreeVar";
import {SUDOKU_DOMAIN} from "../src/Constants";

describe("Sudoku", () => {
    describe("row", () => {
        test.each([0, 1, 2, 3, 4, 5, 6, 7, 8])("%i", (row) => {
            const sudoku = new Sudoku();

            expect(sudoku.row(row)).toEqual([
                new FreeVar(`1-${row + 1}`, SUDOKU_DOMAIN),
                new FreeVar(`2-${row + 1}`, SUDOKU_DOMAIN),
                new FreeVar(`3-${row + 1}`, SUDOKU_DOMAIN),
                new FreeVar(`4-${row + 1}`, SUDOKU_DOMAIN),
                new FreeVar(`5-${row + 1}`, SUDOKU_DOMAIN),
                new FreeVar(`6-${row + 1}`, SUDOKU_DOMAIN),
                new FreeVar(`7-${row + 1}`, SUDOKU_DOMAIN),
                new FreeVar(`8-${row + 1}`, SUDOKU_DOMAIN),
                new FreeVar(`9-${row + 1}`, SUDOKU_DOMAIN),
            ]);

        });
    });
    describe("col", () => {

        test.each([0, 1, 2, 3, 4, 5, 6, 7, 8])("%i", (col) => {
            const sudoku = new Sudoku();

            expect(sudoku.col(col)).toEqual([
                new FreeVar(`${col + 1}-1`, SUDOKU_DOMAIN),
                new FreeVar(`${col + 1}-2`, SUDOKU_DOMAIN),
                new FreeVar(`${col + 1}-3`, SUDOKU_DOMAIN),
                new FreeVar(`${col + 1}-4`, SUDOKU_DOMAIN),
                new FreeVar(`${col + 1}-5`, SUDOKU_DOMAIN),
                new FreeVar(`${col + 1}-6`, SUDOKU_DOMAIN),
                new FreeVar(`${col + 1}-7`, SUDOKU_DOMAIN),
                new FreeVar(`${col + 1}-8`, SUDOKU_DOMAIN),
                new FreeVar(`${col + 1}-9`, SUDOKU_DOMAIN),
            ]);

        });
    });

    describe("box", () => {

        test.each([
            [0, 0, 0],
            [1, 0, 1],
            [2, 0, 2],
            [3, 1, 0],
            [4, 1, 1],
            [5, 1, 2],
            [6, 2, 0],
            [7, 2, 1],
            [8, 2, 2],
        ])("%i", (n, x, y) => {
            const sudoku = new Sudoku();

            expect(sudoku.box(n)).toEqual([
                new FreeVar(`${x * 3 + 1}-${y * 3 + 1}`, SUDOKU_DOMAIN),
                new FreeVar(`${x * 3 + 1}-${y * 3 + 2}`, SUDOKU_DOMAIN),
                new FreeVar(`${x * 3 + 1}-${y * 3 + 3}`, SUDOKU_DOMAIN),
                new FreeVar(`${x * 3 + 2}-${y * 3 + 1}`, SUDOKU_DOMAIN),
                new FreeVar(`${x * 3 + 2}-${y * 3 + 2}`, SUDOKU_DOMAIN),
                new FreeVar(`${x * 3 + 2}-${y * 3 + 3}`, SUDOKU_DOMAIN),
                new FreeVar(`${x * 3 + 3}-${y * 3 + 1}`, SUDOKU_DOMAIN),
                new FreeVar(`${x * 3 + 3}-${y * 3 + 2}`, SUDOKU_DOMAIN),
                new FreeVar(`${x * 3 + 3}-${y * 3 + 3}`, SUDOKU_DOMAIN),
            ]);
        });
    });

});