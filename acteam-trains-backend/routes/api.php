<?php

use Illuminate\Support\Facades\Route;

date_default_timezone_set('Europe/Paris');

// Endpoint to get data from trains.json
Route::get('/trains-data', function () {
    $dataPath = storage_path('app/private/trains.json');

    // Checking if trains.json exists in the project
    if (!file_exists($dataPath)) {
        return response()->json([
            'error' => 'Error while retrieving data'
        ], 404);
    }

    $data = json_decode(file_get_contents($dataPath), true);

    // Checking if there are data for arriving trains
    if (!isset($data['arrivees'])) {
        return response()->json([
            'error' => 'Arriving trains not founded'
        ], 500);
    }

    // Checking if it is an array
    if (!is_array($data['arrivees'])) {
        return response()->json([
            'error' => 'Arrivees is not an array'
        ], 500);
    }

    // Checking if there are data for departing trains
    if (!isset($data['depart'])) {
        return response()->json([
            'error' => 'Departing trains not founded'
        ], 500);
    }

    // Checking is it is an array
    if (!is_array($data['depart'])) {
        return response()->json([
            'error' => 'Depart is not an array'
        ], 500);
    }

    // Collecting and stocking arriving/departing trains data
    $arrivees = $data['arrivees'];
    $departs = $data['depart'];

    // Sorting arriving trains in chronological order
    usort($arrivees, function ($a, $b) {
        if (strtotime($a['heure']) < strtotime($b['heure'])) {
            return -1;
        } elseif (strtotime($a['heure']) > strtotime($b['heure'])) {
            return 1;
        }

        return 0;
    });

    // Sorting departing train in chronological order
    usort($departs, function ($a, $b) {
        if (strtotime($a['heure']) < strtotime($b['heure'])) {
            return -1;
        } elseif (strtotime($a['heure']) > strtotime($b['heure'])) {
            return 1;
        }

        return 0;
    });

    // Stocking every arriving trains which are late with the time (ex: TGV7812 : "14:15")
    $arriveesRetards = [];

    // Adding the interval between arriving time and late time
    foreach ($arrivees as $arrivee) {
        $trainTimestamp = strtotime($arrivee['heure']);
        if (isset($arrivee['retard']) && $arrivee['retard'] > 0) {
            $retardInSeconds = $arrivee['retard'] * 60;
            $trainTimestamp += $retardInSeconds;

            $arriveesRetards[$arrivee['numero']] = date('H:i', $trainTimestamp);
        }
    }

    // Stocking every departing trains which are late with the time (ex: TGV7821 : "14:05")
    $departsRetards = [];

    // Adding the interval between departing time and late time
    foreach ($departs as $depart) {
        $trainTimestamp = strtotime($depart['heure']);
        if (isset($depart['retard']) && $depart['retard'] > 0) {
            $retardInSeconds = $depart['retard'] * 60;
            $trainTimestamp += $retardInSeconds;

            $departsRetards[$depart['numero']] = date('H:i', $trainTimestamp);
        }
    }

    // Returning a json with :
    // - the request's status,
    // - an array of sorted arriving trains,
    // - an array of sorted departing trains,
    // - an array of late arriving trains,
    // - an array of late departing trains
    return response()->json([
        'status' => 'success',
        'arrivees' => $arrivees,
        'departs' => $departs,
        'retardsArrivees' => $arriveesRetards,
        'retardsDeparts' => $departsRetards
    ]);
});

Route::get('/get-next-arrival', function () {
    $dataPath = storage_path('app/private/trains.json');

    // Checking if trains.json exists
    if (!file_exists($dataPath)) {
        return response()->json([
            'error' => 'Error while retrieving data'
        ], 404);
    }

    $data = json_decode(file_get_contents($dataPath), true);

    // Checking if there are data for arriving trains
    if (!isset($data['arrivees'])) {
        return response()->json([
            'error' => 'Arriving trains not founded'
        ], 500);
    }

    // Checking if it is an array
    if (!is_array($data['arrivees'])) {
        return response()->json([
            'error' => 'Arrivees is not an array'
        ], 500);
    }

    // Stocking arriving trains data and initializing a variable for the next arriving train
    $arrivees = $data['arrivees'];
    $nextTrain = null;

    // Sorting the arriving trains in chronological order
    usort($arrivees, function ($a, $b) {
        $timeA = strtotime($a['heure']);
        $timeB = strtotime($b['heure']);

        if (isset($a['retard']) && $a['retard'] > 0) {
            $retard = $a['retard'] * 60;
            $timeA += $retard;
        }

        if (isset($b['retard']) && $b['retard'] > 0) {
            $retard = $b['retard'] * 60;
            $timeB += $retard;
        }
        if ($timeA < $timeB) {
            return -1;
        } elseif ($timeA > $timeB) {
            return 1;
        }

        return 0;
    });

    // Checking for next arriving train in condition to actual time
    foreach ($arrivees as $arrivee) {
        $now = date('H:i');
        $nowTimestamp = strtotime($now);

        $time = strtotime($arrivee['heure']);

        if (isset($arrivee['retard']) && $arrivee['retard'] > 0) {
            $retard = $arrivee['retard'] * 60;
            $time += $retard;
        }

        if ($time >= $nowTimestamp) {
            $nextTrain = $arrivee;
            break;
        }
    }

    if ($nextTrain == null) {
        $nextTrain = $arrivees[0];
    }

    // Returning a json with :
    // the request's status,
    // the train's type,
    // data of the next train
    return response()->json([
        'status' => 'success',
        'type' => 'Arrivées',
        'next' => $nextTrain
    ]);
});

Route::get('/get-next-departure', function () {
    $dataPath = storage_path('app/private/trains.json');

    // Checking is trains.json exists
    if (!file_exists($dataPath)) {
        return response()->json([
            'error' => 'Error while retrieving data'
        ], 404);
    }

    $data = json_decode(file_get_contents($dataPath), true);

    // Checking if there are data for departing trains
    if (!isset($data['depart'])) {
        return response()->json([
            'error' => 'Departing trains not founded'
        ], 500);
    }

    // Checking if it's an array
    if (!is_array($data['depart'])) {
        return response()->json([
            'error' => 'Depart is not an array'
        ], 500);
    }

    // Stocking departing trains data
    $departs = $data['depart'];

    // Sorting departing trains in chronological order
    usort($departs, function ($a, $b) {
        $timeA = strtotime($a['heure']);
        $timeB = strtotime($b['heure']);

        if (isset($a['retard']) && $a['retard'] > 0) {
            $retard = $a['retard'] * 60;
            $timeA += $retard;
        }

        if (isset($b['retard']) && $b['retard'] > 0) {
            $retard = $b['retard'] * 60;
            $timeB += $retard;
        }
        if ($timeA < $timeB) {
            return -1;
        } elseif ($timeA > $timeB) {
            return 1;
        }

        return 0;
    });

    // Intializing a variable for the next train
    $nextTrain = null;

    // Checking for next departing train in condition to actual time
    foreach ($departs as $depart) {
        $now = date('H:i');
        $nowTimestamp = strtotime($now);

        $time = strtotime($depart['heure']);

        if (isset($depart['retard']) && $depart['retard'] > 0) {
            $retard = $depart['retard'] * 60;
            $time += $retard;
        }

        if ($time >= $nowTimestamp) {
            $nextTrain = $depart;
            break;
        }
    }

    if ($nextTrain == null) {
        $nextTrain = $departs[0];
    }

    // Returning a json with :
    // the request's json,
    // the train's type,
    // data of the next train
    return response()->json([
        'status' => 'success',
        'type' => 'Départs',
        'next' => $nextTrain
    ]);
});
