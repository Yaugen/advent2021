import fs from "fs";
import path from "path";

const input = fs
	.readFileSync(path.resolve("18", "input"), "utf8")
	.split("\n")
	.map((line) => JSON.parse(line));

const parse = (el) => {
	const node = {
		type: null,
		parent: null,
	};
	if (Array.isArray(el)) {
		node.type = "pair";
		node.left = parse(el[0]);
		node.left.parent = node;
		node.right = parse(el[1]);
		node.right.parent = node;
	} else {
		node.type = "value";
		node.value = el;
	}
	return node;
};

const getValues = (root) => {
	const values = [];
	const traverse = (node) => {
		if (node.type === "value") {
			values.push(node);
		}
		if (node.left) {
			traverse(node.left);
		}
		if (node.right) {
			traverse(node.right);
		}
	};
	traverse(root);
	return values;
};

const printValues = (root) => {
	console.log(
		getValues(root)
			.map((v) => v.value)
			.join(",")
	);
};

const getLeftRightValues = (root, borderNode) => {
	const values = getValues(root);
	const gapFrom = values.findIndex((node) => node === borderNode.left);
	return [values.slice(0, gapFrom), values.slice(gapFrom + 2)];
};

const findExplode = (node, height = 0) => {
	if (node.type === "value") {
		return null;
	}
	if (height > 3 && node.left.type === "value" && node.right.type === "value") {
		return node;
	}
	if (node.left) {
		const left = findExplode(node.left, height + 1);
		if (left) {
			return left;
		}
	}
	if (node.right) {
		const right = findExplode(node.right, height + 1);
		if (right) {
			return right;
		}
	}
	return null;
};

const performExplode = (root, nodeToExplode) => {
	let [left, right] = getLeftRightValues(root, nodeToExplode);
	left = left.pop();
	if (left) {
		left.value += nodeToExplode.left.value;
	}
	right = right.shift();
	if (right) {
		right.value += nodeToExplode.right.value;
	}
	const newNode = {
		type: "value",
		value: 0,
		parent: nodeToExplode.parent,
	};
	if (nodeToExplode.parent.left === nodeToExplode) {
		nodeToExplode.parent.left = newNode;
	} else {
		nodeToExplode.parent.right = newNode;
	}
};

const findSplit = (root) => {
	const values = getValues(root);
	return values.find((node) => node.value >= 10);
};

const performSplit = (nodeToSplit) => {
	const newNode = {
		type: "pair",
		parent: nodeToSplit.parent,
	};
	const leftNode = {
		type: "value",
		value: Math.floor(nodeToSplit.value / 2),
		parent: newNode,
	};
	newNode.left = leftNode;
	const rightNode = {
		type: "value",
		value: Math.ceil(nodeToSplit.value / 2),
		parent: newNode,
	};
	newNode.right = rightNode;

	if (nodeToSplit.parent.left === nodeToSplit) {
		nodeToSplit.parent.left = newNode;
	} else {
		nodeToSplit.parent.right = newNode;
	}
};

const normalize = (root) => {
	let nodeToExplode;
	let nodeToSplit;
	printValues(root);
	while (
		(nodeToExplode = findExplode(root)) ||
		(nodeToSplit = findSplit(root))
	) {
		if (nodeToExplode) {
			console.log(
				"explode",
				nodeToExplode.left.value,
				nodeToExplode.right.value
			);
			performExplode(root, nodeToExplode);
		} else {
			console.log("split", nodeToSplit.value);
			performSplit(nodeToSplit);
		}
		printValues(root);
	}

	return root;
};

const getMagnitude = (node) => {
	if (node.type === "value") {
		return node.value;
	}
	return 3 * getMagnitude(node.left) + 2 * getMagnitude(node.right);
};

const resRoot = input.reduce((root, line) => {
	if (!root) {
		return normalize(parse(line));
	}
	const newRoot = {
		type: "pair",
		left: root,
		right: parse(line),
	};

	newRoot.left.parent = newRoot;
	newRoot.right.parent = newRoot;

	return normalize(newRoot);
}, null);

console.log(getMagnitude(resRoot));
