import {create} from "zustand";

interface IRingState{
    rings: ["Inner", "Middle", "Outer"],
    positions: number[],
    circles: number[],
    rotations: number[],
    coordinates: number[][],
    combinations: number[][],
    changePosition: (index: number, value: number) => void,
    changeCircle: (index: number, value: number) => void,
    changeRotation: (index: number, value: number) => void,
    changeCombination: (index1: number, index2: number, value: number) => void,
}

const useRingStore = create<IRingState>()((set) => ({
    rings: ["Inner", "Middle", "Outer"],
    positions: [0, 2, 1],
    circles: [1, 4, 1],
    rotations: [1, 1, 1],
    coordinates: [[16, 70], [50, 90], [85, 70],  [85, 30], [50, 10], [16, 30]], // old coordinates: [[10, 50], [23, 80], [50, 90], [78, 80], [90, 50], [78, 20], [50, 10], [23, 20]],
    combinations: [[0, 1, 1], [1, 0, 1], [1, 0, 0]],
    changePosition: (index: number, value: number) => set((state) => ({ 
        positions: [
            ...state.positions.slice(0, index),
            value,
            ...state.positions.slice(index+1, state.positions.length)
        ] 
    })),
    changeCircle: (index: number, value: number) => set((state) => ({
        circles: [
            ...state.circles.slice(0, index),
            value,
            ...state.circles.slice(index + 1, state.circles.length)
        ]
    })),
    changeRotation: (index: number, value: number) => set((state) => ({
        rotations: [
            ...state.rotations.slice(0, index),
            value,
            ...state.rotations.slice(index + 1, state.rotations.length)
        ]
    })),
    changeCombination: (index1: number, index2: number, value: number) => set((state) => ({
        combinations: [
            ...state.combinations.slice(0, index1),
            [
                ...state.combinations[index1].slice(0, index2),
                value,
                ...state.combinations[index1].slice(index2+1)
            ],
            ...state.combinations.slice(index1+1),
        ]
    })),
}))

export default useRingStore;