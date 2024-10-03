import useRingStore from "../store/ringStore";
import Queue from "./Queue";
import { bitsData, bfsData } from "../types";

const generateVisitedKey = (i: number, j: number, k: number) => `${i} ${j} ${k}`;

export default function bfs() {
    // All the data is in the form of [Inner, Middle, Outer]
    const MOD = 6;
    const TARGET_POSITION = 4;
    const { combinations: moves, positions, circles, rotations } = useRingStore.getState();
    const [a, b, c] = positions;
    const queue = new Queue<bfsData>();
    const visited = new Set<string>();

    queue.push([a, b, c, Array(7).fill(0) as bitsData])
    visited.add(generateVisitedKey(a, b, c));

    while (queue.length !== 0) {
        const [x, y, z, counter] = queue.pop() as bfsData;

        // We want all the numbers to stop at the 4th index
        if (x === TARGET_POSITION && y === TARGET_POSITION && z === TARGET_POSITION) {
            return counter;
        }

        for (const [dx, dy, dz] of moves) {

            // Calculate the next position of rings
            const i = (MOD + x + dx * rotations[0] * circles[0]) % MOD;
            const j = (MOD + y + dy * rotations[1] * circles[1]) % MOD;
            const k = (MOD + z + dz * rotations[2] * circles[2]) % MOD;

            const key = generateVisitedKey(i, j, k);
            if (!visited.has(key)) {
                visited.add(key)
                const num = (dx << 2) | (dy << 1) | dz; // Converting binary number to decimal
                const newCounter = counter.map((value, idx) => value + Number(num === idx)) as bitsData;
                queue.push([i, j, k, newCounter])
            }
        }
    }
    return [];
}