import TrainComponent from "./TrainComponent.jsx";

export default function NextTrain({ type, lates, train }) {
    // Getting the props according to if the train is late or not
    const isLate = (train.retard && train.retard > 0) ? { late: train.retard} : {};
    const hourLate = (train.retard && train.retard > 0) ? { hourWithLate: lates[train.numero]} : {}

    // Gettings the props according to the type of train (Departure / Arrival)
    const isDepartOrArrivee = (type === "Arrivées" ? { from: train.provenance } : { from: train.destination })

    return (
        <div className="flex flex-col h-[80%] shadow-(--blue-shadow) rounded-xl p-5">
            <span className="text-3xl pb-5">{type === "Arrivées" ? "Prochaine arrivée" : "Prochain départ"}</span>
            <TrainComponent
                type={type}
                number={train.numero}
                hour={train.heure}
                {...isLate}
                {...hourLate}
                {...isDepartOrArrivee}
            />
        </div>
    )
}