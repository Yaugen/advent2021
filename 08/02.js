import fs from "fs";
import path from "path";

/*
0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c     0 - 6
b    c  .    c  .    c  .    c  b    c     1 - 2
 ....    ....    dddd    dddd    dddd      2 - 5
e    f  .    f  e    .  .    f  .    f     3 - 5
e    f  .    f  e    .  .    f  .    f     4 - 4
 gggg    ....    gggg    gggg    ....      5 - 5
                                           6 - 6
 5:      6:      7:      8:      9:        7 - 3
 aaaa    aaaa    aaaa    aaaa    aaaa      8 - 7
b    .  b    .  .    c  b    c  b    c     9 - 6
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg
*/
const input = fs.readFileSync(path.resolve("08", "input"), "utf8").split("\n");

const getSimilarityCount = (str1, str2) => {
	return [...str2].filter((c) => str1.includes(c)).length;
};
const getMapping = (patterns) => {
	const numbers = Array(10).fill("");

	numbers[1] = patterns.find((item) => item.length === 2);
	numbers[4] = patterns.find((item) => item.length === 4);
	numbers[7] = patterns.find((item) => item.length === 3);
	numbers[8] = patterns.find((item) => item.length === 7);
	numbers[3] = patterns.find(
		(item) => item.length === 5 && getSimilarityCount(item, numbers[1]) === 2
	);
	numbers[6] = patterns.find(
		(item) => item.length === 6 && getSimilarityCount(item, numbers[1]) === 1
	);
	numbers[2] = patterns.find(
		(item) => item.length === 5 && getSimilarityCount(item, numbers[4]) === 2
	);
	numbers[5] = patterns.find(
		(item) =>
			item.length === 5 &&
			item !== numbers[3] &&
			getSimilarityCount(item, numbers[4]) === 3
	);
	numbers[0] = patterns.find(
		(item) =>
			item.length === 6 &&
			item !== numbers[6] &&
			getSimilarityCount(item, numbers[4]) === 3
	);
	numbers[9] = patterns.find(
		(item) => item.length === 6 && getSimilarityCount(item, numbers[4]) === 4
	);

	return Object.fromEntries(numbers.map((item, index) => [item, index]));
};

const lines = input.map((line) => {
	let [patterns, output] = line.split(" | ");
	patterns = patterns.split(" ").map((item) => item.split("").sort().join(""));
	output = output.split(" ").map((item) => item.split("").sort().join(""));
	return { patterns, output };
});
const outputs = lines.map((line) => {
	const mapping = getMapping(line.patterns);
	return Number(line.output.map((item) => mapping[item]).join(""));
});
const res = outputs.reduce((sum, item) => sum + item, 0);

console.log(res);
