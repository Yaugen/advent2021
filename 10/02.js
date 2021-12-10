import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.resolve("10", "input"), "utf8").split("\n");

const scoreTable = {
	")": 1,
	"]": 2,
	"}": 3,
	">": 4,
};

const closingToOpening = {
	")": "(",
	"}": "{",
	"]": "[",
	">": "<",
};
const openingToClosing = {
	"(": ")",
	"{": "}",
	"[": "]",
	"<": ">",
};
const openings = Object.keys(openingToClosing);
const parseLine = (line) => {
	const stack = [];
	for (let c of line) {
		if (openings.includes(c)) {
			stack.push(c);
		} else {
			const top = stack.pop();
			if (!top || closingToOpening[c] !== top) {
				return c;
			}
		}
	}
	if (stack.length) {
		return stack.map((item) => openingToClosing[item]).reverse();
	}
	return true;
};

const res = input
	.map((line) => {
		const lineRes = parseLine(line);
		if (Array.isArray(lineRes)) {
			return lineRes.reduce((score, item) => score * 5 + scoreTable[item], 0);
		}
		return false;
	})
	.filter(Boolean)
	.sort((a, b) => a - b);
console.log(res[Math.floor(res.length / 2)]);
