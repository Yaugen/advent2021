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

const linesOutputs = input.map((line) =>
	line
		.split(" | ")[1]
		.split(" ")
		.map((part) => part.length)
);
const linesWithUniqeOutputs = linesOutputs.map((outputs) =>
	outputs.filter((item) => [2, 4, 3, 7].includes(item))
);
const res = linesWithUniqeOutputs.reduce((sum, e) => sum + e.length, 0);

console.log(res);
