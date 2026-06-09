<?php

namespace App\Http\Controllers;

use App\Models\Station;
use Illuminate\Http\Request;

class StationController extends Controller
{
    public function index()
    {
        return response()->json(Station::all());
    }

    public function store(Request $request)
    {
        $station = Station::create($request->all());

        return response()->json([
            'message' => 'Station Added Successfully',
            'station' => $station
        ]);
    }

    public function show($id)
    {
        return response()->json(
            Station::findOrFail($id)
        );
    }

    public function update(Request $request, $id)
    {
        $station = Station::findOrFail($id);

        $station->update($request->all());

        return response()->json([
            'message' => 'Station Updated Successfully',
            'station' => $station
        ]);
    }

    public function destroy($id)
    {
        Station::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Station Deleted Successfully'
        ]);
    }
}