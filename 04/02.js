import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.resolve("04", "input"), "utf8");
let [numbers, ...boards] = input.split("\n\n");
numbers = numbers.split(",").map(Number);
boards = boards.map((board) =>
	board.split("\n").map((line) =>
		line
			.split(" ")
			.filter(Boolean)
			.map((cell) => ({ value: Number(cell), marked: false }))
	)
);

const winnedBoards = [];
let lastNumber;

for (let num of numbers) {
	for (let board of boards) {
		if (winnedBoards.includes(board)) {
			continue;
		}
		for (let line of board) {
			for (let i = 0; i < line.length; i++) {
				if (line[i].value === num) {
					line[i].marked = true;
					if (
						line.every((cell) => cell.marked) ||
						board.every((line) => line[i].marked)
					) {
						winnedBoards.push(board);
					}
				}
			}
		}
	}
	if (winnedBoards.length === boards.length) {
		lastNumber = num;
		break;
	}
}
let lastBoard = winnedBoards.pop();

const boardScore = lastBoard.reduce(
	(sum, line) =>
		sum +
		line.reduce((lineSum, cell) => lineSum + (cell.marked ? 0 : cell.value), 0),
	0
);
console.log(boardScore * lastNumber);
