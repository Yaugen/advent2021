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

const findPathes = (start) => {
	let pathes = start || [
		{
			path: ["start"],
			visited: ["start"],
			isEnded: false,
			isVisitedTwice: false,
		},
	];
	while (pathes.some((p) => !p.isEnded)) {
		pathes = pathes.reduce((acc, item) => {
			if (item.isEnded) {
				return [...acc, item];
			}
			const curNode = item.path[item.path.length - 1];
			const nextNodes = map[curNode].filter((n) => !item.visited.includes(n));
			return [
				...acc,
				...nextNodes.flatMap((n) => {
					const isSmallCave = n === n.toLowerCase();

					if (isSmallCave && !item.isVisitedTwice && n !== "end") {
						return [
							{
								path: [...item.path, n],
								visited: [...item.visited],
								isEnded: n === "end",
								isVisitedTwice: true,
							},
							{
								path: [...item.path, n],
								visited: [...item.visited, n],
								isEnded: n === "end",
								isVisitedTwice: false,
							},
						];
					}

					return [
						{
							path: [...item.path, n],
							visited: isSmallCave
								? [...item.visited, n]
								: item.visited.slice(),
							isEnded: n === "end",
							isVisitedTwice: item.isVisitedTwice,
						},
					];
				}),
			];
		}, []);
	}
	return pathes;
};

const pathes = findPathes();
const uniquePathes = new Set(pathes.map(({ path }) => path.join(",")));
console.log(uniquePathes.size);
