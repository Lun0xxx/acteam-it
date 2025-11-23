import { MoveRight, Hash, Clock } from 'lucide-react';

export default function TrainComponent({index = 0, type, number, from, hour, late= 0, hourWithLate= ""}) {
    return (
        <div className={`flex p-5 border-l-11 border-1 rounded-xl justify-between
            ${late > 0 ? "border-orange-300" : "border-green-400"}
            ${index !== 0 ? "mt-2" : ""}
        `}>
            <div className="flex flex-col justify-center">
                <span>
                    Train :
                    <span className="font-bold"> {number}</span>
                </span>
                <span>
                    {type === "Arrivées" ? 'En provenance de : ' : 'À destination de : '}
                    <span className="font-bold">{from}</span>
                </span>
            </div>
            <div className="flex items-center">
                <div className={`ml-10 h-full flex flex-col
                    ${late > 0 ? 'justify-end' : 'justify-center'}
                `}>
                    <Clock
                        size={20}
                    />
                </div>
                <div className="mr-5 ml-2 flex flex-col">
                    <span className={`
                        ${late > 0 ? 'line-through text-orange-300' : 'font-bold'}`
                    }>
                        {hour}
                    </span>
                    { (late > 0) && <div>
                        <span className="font-bold">{ hourWithLate !== "" ? hourWithLate : null}</span>
                        <span className="ml-2">{ late > 0 ? `+${late} min` : null}</span>
                    </div> }
                </div>
                <div className="flex flex-col text-right">
                    <span className={`font-bold text-white p-1 rounded
                        ${late > 0 ? 'bg-orange-300' : 'bg-green-400'}
                    `}>
                        { late > 0 ? "En retard" : "À l'heure"}
                    </span>
                </div>
            </div>
        </div>
    )
}