import { useState } from "react";
import useRingStore from "../store/ringStore";

const Combinations = () => {
    
    const [combinations, setCombinations] = useState(useRingStore.getState().combinations);

    function handleChange(index1: number, index2: number, value: number){
        if(index1 > 2 || index2 > 2 || index1 < 0 || index2 < 0) return;
        const is_zero = [...combinations[index1].slice(0, index2), value, ...combinations[index1].slice(index2+1)].reduce((agg, val) => agg+val);
        if(is_zero === 0){return;}
        useRingStore.getState().changeCombination(index1, index2, value);
        setCombinations(prev => [
            ...prev.slice(0, index1),
                [
                    ...prev[index1].slice(0, index2),
                    value,
                    ...prev[index1].slice(index2+1)
                ],
            ...prev.slice(index1+1)
        ]);
    }

    return (
        <div className="row-span-1 col-span-12 flex flex-col md:flex-row gap-x-4 justify-between items-center gap-y-8 md:gap-y-0">
            {combinations.map((combination, idx1) =>
                <div key={idx1} className="flex flex-col justify-center items-center w-full gap-y-8">
                    <p className="text-2xl font-black">Combination {idx1+1}</p>
                    <div className="flex gap-4">
                        {combination.map((value, idx2) => 
                            <div key={`${idx1}-${idx2}`} tabIndex={0} onClick={() => handleChange(idx1, idx2, (value+1)%2)} className={`cursor-pointer w-4 h-4 rounded-full ${value === 1 ? "bg-yellow-500 hover:bg-yellow-300" : "bg-white hover:bg-gray-300"}`} />
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Combinations;