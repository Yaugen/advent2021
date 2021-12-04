import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.resolve("03", "input"), "utf8").split("\n");
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

let oxy = input.slice();
let co2 = input.slice();
let bit = 0;
while (oxy.length > 1 || co2.length > 1 || bit < len) {
	if (oxy.length > 1) {
		const count = getCountsOfBit(oxy, bit);
		const target = count["0"] > count["1"] ? "0" : "1";
		oxy = oxy.filter((line) => line[bit] === target);
	}
	if (co2.length > 1) {
		const count = getCountsOfBit(co2, bit);
		const target = count["0"] > count["1"] ? "1" : "0";
		co2 = co2.filter((line) => line[bit] === target);
	}

	bit += 1;
}

console.log(parseInt(oxy[0], 2) * parseInt(co2[0], 2));
