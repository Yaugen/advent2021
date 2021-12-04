import fs from "fs";

const input = fs.readFileSync("input", "utf8").split("\n");
const len = input[0].length;

const getCountsOfBit = (data, pos) => {
	return data.reduce(
		(counts, line) => {
			counts[line[pos]] += 1;
			return counts;
		},
		{ 0: 0, 1: 0 }
	);
};
const counts = Array(len)
	.fill(0)
	.map((_, i) => getCountsOfBit(input, i));

const res = counts.reduce(
	(acc, item) => {
		if (item["0"] > item["1"]) {
			acc.gamma += "0";
			acc.epsilon += "1";
		} else {
			acc.gamma += "1";
			acc.epsilon += "0";
		}
		return acc;
	},
	{ gamma: "", epsilon: "" }
);

console.log(parseInt(res.gamma, 2) * parseInt(res.epsilon, 2));
