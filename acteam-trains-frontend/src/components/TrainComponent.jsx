import { MoveRight, Hash, Clock, Milestone, MapPin, TrainFront } from 'lucide-react';

export default function TrainComponent({index = 0, type, number, from, hour, late= 0, hourWithLate= ""}) {
    return (
        <div className={`flex p-5 border-l-11 border-1 rounded-xl justify-between
            ${late > 0 ? "border-orange-300" : "border-green-400"}
            ${index !== 0 ? "mt-2" : ""}
        `}>
            <div className="flex flex-col justify-center">
                <span id="trainDesktop">
                    {'Train :'}
                    &nbsp;
                    <span className="font-bold">{number}</span>
                </span>
                <span id="trainMobile" className="mb-1 flex items-center">
                    <TrainFront />
                    <span className="font-bold ml-1 text-xs md:text-base"> {number}</span>
                </span>
                <span id="fromtoDesktop">
                    {type === "Arrivées" ? 'En provenance de :' : 'À destination de :'}
                    &nbsp;
                    <span className="font-bold">{from}</span>
                </span>
                <span id="fromtoMobile" className="mb-1 flex items-center">
                    { type === "Arrivées" ? <MapPin /> : <Milestone /> }
                    <span className="inline font-bold ml-1 text-xs md:text-base align-middle">{from}</span>
                </span>
                <div id="hoursAndClockMobile" className="mr-3 flex flex-1 items-center text-xs md:text-base">
                    <Clock />
                    <div className="flex flex-wrap">
                        <span className={`ml-1
                            ${late > 0 ? 'line-through text-orange-300' : 'font-bold'}`
                        }>
                            {hour}
                        </span>
                        <div>
                            { (late > 0) && <span className="font-bold ml-1">{ hourWithLate !== "" ? hourWithLate : null}</span> }
                            { (late > 0) && <span className="ml-1">{ late > 0 ? `+${late} min` : null}</span> }
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center">
                <div id="clockDesktop" className={`h-full flex flex-col py-1
                    ${late > 0 ? 'justify-end' : 'justify-center'}
                `}>
                    <Clock
                        size={20}
                    />
                </div>
                <div id="hoursDesktop" className="mr-3 ml-2 flex-col flex-1">
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
                <div className="flex flex-col text-right flex-shrink-0">
                    <span className={`font-bold text-white p-1 rounded text-xs md:text-base
                        ${late > 0 ? 'bg-orange-300' : 'bg-green-400'}
                    `}>
                        { late > 0 ? "En retard" : "À l'heure"}
                    </span>
                </div>
            </div>
        </div>
    )
}