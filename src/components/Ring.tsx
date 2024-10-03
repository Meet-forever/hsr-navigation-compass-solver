import { useState } from "react";
import useRingStore from "../store/ringStore";
import { useShallow } from "zustand/shallow";

const Ring = ({ index }: { index:number }) => {
    
    const [clockPosition, setClockPosition] = useState(useRingStore.getState().positions[index]);
    const [circles, setCircles] = useState(useRingStore.getState().circles[index]);
    const [rotation, setRotation] = useState(useRingStore.getState().rotations[index]);

    const { coordinates, rings, changePosition, changeCircle, changeRotation } = useRingStore(
        useShallow((state) => ({
            coordinates: state.coordinates,
            rings: state.rings,
            changePosition: state.changePosition,
            changeCircle: state.changeCircle,
            changeRotation: state.changeRotation,
        }))
    );
    

    return (<>
        <h2 className="text-2xl font-black">{rings[index]} Ring</h2>
        <div className="relative w-[20vw] h-[20vw] min-w-[200px] min-h-[200px] max-w-[250px] max-h-[250px] border border-white rounded-full">
            {coordinates.map((value, idx) =>{
                return(
                    <div key={idx} 
                        style={{top:`${value[0]}%`, left: `${value[1]}%`}} 
                        onClick={() => {setClockPosition(idx); changePosition(index, idx)}} 
                        tabIndex={0}
                        className={`cursor-pointer absolute flex justify-center items-center rounded-full w-5 h-5 ${idx === clockPosition ? "bg-slate-100 text-black" : ""} hover:bg-slate-100 hover:text-black  -translate-x-1/2 -translate-y-1/2`}>
                    {idx + 1}
                </div>)}
            )}
        </div>
        <h3 className="text-lg font-black">Circles</h3>
        <div className="flex gap-4">
            {Array(4).fill(0).map((_value, idx) => 
                <div tabIndex={0} key={idx} onClick={() => { setCircles(idx + 1); changeCircle(index, idx + 1); }} className={`focus:border-blue-600 focus:ring-0  cursor-pointer w-4 h-4 rounded-full ${(idx < circles) ? "bg-yellow-500 hover:bg-yellow-300" : "bg-white hover:bg-gray-300"}`} ></div>
            )}
        </div>
        <h3 className="text-lg font-black">Rotation</h3>
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center gap-4">
                <h3>Clockwise: </h3>
                <div tabIndex={0} onClick={() => { setRotation(prev => (prev === 1) ? prev : 1); changeRotation(index, 1) }} className={`cursor-pointer w-4 h-4 ${(rotation === 1) ? "bg-yellow-500 hover:bg-yellow-300": "bg-white hover:bg-gray-300"} rounded-full`} />
            </div>
            <div className="flex justify-between items-center gap-4">
                <h3>Counter clockwise: </h3>
                <div tabIndex={0} onClick={() => { setRotation(prev => (prev === -1) ? prev : -1); changeRotation(index, -1) }} className={`cursor-pointer w-4 h-4 ${(rotation === -1) ? "bg-yellow-500 hover:bg-yellow-300" : "bg-white hover:bg-gray-300"} rounded-full`} />
            </div>
        </div>
    </>
    )
}

export default Ring;