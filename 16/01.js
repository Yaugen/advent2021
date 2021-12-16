import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.resolve("16", "input"), "utf8");

const hexMap = {
	0: "0000",
	1: "0001",
	2: "0010",
	3: "0011",
	4: "0100",
	5: "0101",
	6: "0110",
	7: "0111",
	8: "1000",
	9: "1001",
	A: "1010",
	B: "1011",
	C: "1100",
	D: "1101",
	E: "1110",
	F: "1111",
};

const bits = input
	.split("")
	.map((item) => hexMap[item])
	.join("");

const parsePackets = (start, length) => {
	let pointer = start;
	const packets = [];
	while (pointer < start + length) {
		const { packet, newPointer } = parsePacket(pointer);
		packets.push(packet);
		pointer = newPointer;
	}

	return { packets, newPointer: pointer };
};

const parsePacket = (startPointer) => {
	let curPointer = startPointer;
	const packet = {};
	const get = (n) => {
		const v = bits.slice(curPointer, curPointer + n);
		curPointer += n;
		return v;
	};

	const parseValueType = () => {
		let value = "";
		do {
			const valuePart = get(5);
			const readFlag = valuePart[0];
			value += valuePart.slice(1);
			if (readFlag === "0") {
				break;
			}
		} while (true);
		packet.value = parseInt(value, 2);
	};

	const parseOperatorType = () => {
		packet.lengthType = parseInt(get(1), 2);
		packet.subPackets = [];
		if (packet.lengthType === 0) {
			packet.subPacketsLength = parseInt(get(15), 2);
			const { packets: subPackets, newPointer } = parsePackets(
				curPointer,
				packet.subPacketsLength
			);
			packet.subPackets = subPackets;
			curPointer = newPointer;
		} else {
			packet.subPacketsCount = parseInt(get(11), 2);
			for (let i = 0; i < packet.subPacketsCount; i++) {
				const { packet: subPacket, newPointer } = parsePacket(curPointer);
				curPointer = newPointer;
				packet.subPackets.push(subPacket);
			}
		}
	};

	packet.version = parseInt(get(3), 2);
	packet.type = parseInt(get(3), 2);

	if (packet.type === 4) {
		parseValueType();
	} else {
		parseOperatorType();
	}

	return { packet, newPointer: curPointer };
};

const { packet: parsedPacket } = parsePacket(0);

const traverse = (packets, cb) => {
	packets.forEach((packet) => {
		cb(packet);
		if (packet.subPackets) {
			traverse(packet.subPackets, cb);
		}
	});
};

let totalVersion = 0;
traverse([parsedPacket], (p) => (totalVersion += p.version));
console.log(totalVersion);
