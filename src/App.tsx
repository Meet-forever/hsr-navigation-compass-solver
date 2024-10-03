import Ring from "./components/Ring"
import useRingStore from "./store/ringStore"
import Combinations from "./components/Combinations"
import { useState } from "react"
import bfs from "./algorithms/BFS"


function App() {

    const rings = useRingStore.getState().rings;

    const [answer, setAnswer] = useState([0, 0, 0]);
    const [solvable, setSolvable] = useState<boolean>();
        
    const handleSolve = () => {
        setSolvable(undefined);
        const result = bfs();
        if(result.length === 0){
            setSolvable(false);
            setAnswer([0, 0, 0]);
            return;
        }

        // Filter out all the zero value and create a counter object for lookup
        const rotation_counter = Object.fromEntries(result.map((count, index) => [index, count])
            .filter((entry) => entry[1] !== 0));  
        
        setSolvable(true);
        
        // For each combination, count how many rotations will be required
        setAnswer(useRingStore.getState().combinations.map((combination) => {
            const number = (combination[0] << 2) | (combination[1] << 1) | combination[2]; // Converting binary number to decimal
            if(String(number) in rotation_counter) return rotation_counter[String(number)];
            return 0;
        }))
    }

    return (
        <div className="max-w-5xl mx-auto px-5 pb-5 flex flex-col gap-y-16">
            <nav className="p-x text-5xl font-black leading-relaxed"><h1>HSR: Navigation Compass Solver</h1></nav>
            <div className="grid grid-rows-3 grid-cols-12 gap-x-5 gap-y-5  md:gap-y-0 ">
                {rings.map((_value, idx)  =>
                    <div key={idx} className="row-span-1 md:row-span-full col-span-12 md:col-span-4 flex justify-center items-center flex-col gap-5 border border-white rounded-xl p-4">
                        <Ring index={idx} />
                    </div>
                )}
            </div>
            <Combinations />
            <div className="flex justify-center items-center">
                {/* <button onClick={handleSolve} className="m-2 p-3 text-white rounded-xl transition-all duration-500 bg-gradient-to-tl from-pink-500 via-red-500 to-yellow-500 bg-size-200 bg-pos-0 hover:bg-pos-100 font-semibold">Solve</button> */}
                <button onClick={handleSolve} className="m-2 p-3 text-white rounded-xl transition-all duration-500 border border-white hover:bg-zinc-900">Solve</button>
            </div>
            <div className=" border border-white rounded-lg w-full">
                <div className={`p-2 border border-white rounded-lg ${(solvable === undefined)? '': (solvable)? 'bg-green-600': 'bg-red-600'}`}>
                    <h1 className="text-2xl font-black">Result: {(solvable === undefined)? "": solvable? "": "Can't be solved!"}</h1>
                </div>
                {solvable && <div className="p-4">
                    {answer.map((value, idx) => 
                        <div key={idx} className="flex gap-y-4 gap-x-5 items-center">
                            <h1 className="text-lg font-semibold">Combination {idx+1}: </h1>
                            <p>Rotate <b>{value}</b> time(s)</p>
                        </div>
                    )}
                </div>}
            </div>
        </div>
    )
}


export default App