import fs from "fs";
import path from "path";

const input = fs
	.readFileSync(path.resolve("12", "input"), "utf8")
	.split("\n")
	.map((item) => item.split("-"));

const map = input.reduce((acc, [from, to]) => {
	if (!acc[from]) {
		acc[from] = [];
	}
	if (!acc[from].includes(to)) {
		acc[from].push(to);
	}
	if (!acc[to]) {
		acc[to] = [];
	}
	if (!acc[to].includes(from)) {
		acc[to].push(from);
	}
	return acc;
}, {});

let pathes = [{ path: ["start"], visited: ["start"], isEnded: false }];
while (pathes.some((p) => !p.isEnded)) {
	pathes = pathes.reduce((acc, item) => {
		if (item.isEnded) {
			return [...acc, item];
		}
		const curNode = item.path[item.path.length - 1];
		const nextNodes = map[curNode].filter((n) => !item.visited.includes(n));
		return [
			...acc,
			...nextNodes.map((n) => ({
				path: [...item.path, n],
				visited:
					n === n.toUpperCase() ? item.visited.slice() : [...item.visited, n],
				isEnded: n === "end",
			})),
		];
	}, []);
}

console.log(pathes.map(({ path }) => path.join(",")));
console.log(pathes.length);
