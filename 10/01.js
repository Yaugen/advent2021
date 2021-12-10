import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.resolve("10", "input"), "utf8").split("\n");

const scoreTable = {
	")": 3,
	"]": 57,
	"}": 1197,
	">": 25137,
};

const pairs = {
	")": "(",
	"}": "{",
	"]": "[",
	">": "<",
};
const openings = Object.values(pairs);
const parseLine = (line) => {
	const stack = [];
	for (let c of line) {
		if (openings.includes(c)) {
			stack.push(c);
		} else {
			const top = stack.pop();
			if (!top || pairs[c] !== top) {
				return c;
			}
		}
	}
	return true;
};

const res = input.reduce((sum, line) => {
	const lineRes = parseLine(line);
	console.log(lineRes);
	return typeof lineRes === "string" ? sum + scoreTable[lineRes] : sum;
}, 0);
console.log(res);
