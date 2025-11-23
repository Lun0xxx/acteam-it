import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'
import TrainsList from "./components/TrainsList.jsx";
import NextTrain from "./components/NextTrain.jsx";

const queryClient = new QueryClient()

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AppContent />
        </QueryClientProvider>
    )
}

function AppContent() {
    // Retrieving trains data fron trains.json
    const {
        isPending: trainsDataLoading,
        error: trainsDataError,
        data: trainsData
    } = useQuery({
        queryKey: ['trainsData'],
        queryFn: () =>
            fetch('http://127.0.0.1:8000/api/trains-data')
                .then(res => res.json())
                .then(json => json)
    })

    // Retrieving data for next arrival train
    const {
        isPending: nextArrivalTrainLoading,
        error: nextArrivalTrainError,
        data: nextArrivalTrainData
    } = useQuery({
        queryKey: ['nextArrivalTrain'],
        queryFn: () =>
            fetch('http://127.0.0.1:8000/api/get-next-arrival')
                .then(res => res.json())
                .then(json => json)
    })

    // Retrieving data for next departure train
    const {
        isPending: nextDepartureTrainLoading,
        error: nextDepartureTrainError,
        data: nextDepartureTrainData
    } = useQuery({
        queryKey: ['nextDepartureTrain'],
        queryFn: () =>
            fetch('http://127.0.0.1:8000/api/get-next-departure')
                .then(res => res.json())
                .then(json => json)
    })

    // Printing Loading if data is not ready
    if (trainsDataLoading) {
        return <p>Loading</p>
    }

    // Printing an error if there is an error while retrieving data
    if (trainsDataError) {
        return <p>Error while retrieving data</p>
    }

    return (
        <div className="h-full max-w-[1500px] w-full flex justify-between">
            <div className="flex flex-col w-1/2 pr-3">
                { trainsData && nextDepartureTrainData && <NextTrain
                    type={nextDepartureTrainData.type}
                    lates={trainsData['retardsDeparts']}
                    train={nextDepartureTrainData.next}
                /> }
                { trainsData && <TrainsList
                    type="Départs"
                    list={trainsData['departs']}
                    lates={trainsData['retardsDeparts']}
                /> }
            </div>
            <div className="flex flex-col w-1/2 pl-3">
                { trainsData && nextArrivalTrainData && <NextTrain
                    index={1}
                    type={nextArrivalTrainData.type}
                    lates={trainsData['retardsArrivees']}
                    train={nextArrivalTrainData.next}
                /> }
                { trainsData && <TrainsList
                    type="Arrivées"
                    list={trainsData['arrivees']}
                    lates={trainsData['retardsArrivees']}
                /> }
            </div>
        </div>
    )
}