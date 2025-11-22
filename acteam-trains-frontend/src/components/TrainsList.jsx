import TrainComponent from './TrainComponent';

export default function TrainsList({ index, type, list, lates }) {
    return (
        <div className={`flex flex-col h-[80%] w-full shadow-(--blue-shadow) rounded-xl p-5 mb-5
            ${index !== 0 ? 'mr-5': ''}
        `}>
            <span className="text-3xl pb-5">{ type }</span>
            <div className="overflow-scroll">
                {
                    // Adding a component for every train in order to make the list
                    list.map((train, index) => {
                    // Getting the props according to if the train is late or not
                    const isLate = (train.retard && train.retard > 0) ? { late: train.retard} : {};
                    const hourLate = (train.retard && train.retard > 0) ? { hourWithLate: lates[train.numero]} : {}

                    // Gettings the props according to the type of train (Departure / Arrival)
                    const isDepartOrArrivee = (type === "Arrivées" ? { from: train.provenance } : { from: train.destination })

                    return (
                        <TrainComponent
                            key={index}
                            index={index}
                            type={type}
                            number={train.numero}
                            hour={train.heure}
                            {...isDepartOrArrivee}
                            {...isLate}
                            {...hourLate}
                        />
                    );
                })}
            </div>
        </div>
    )
}