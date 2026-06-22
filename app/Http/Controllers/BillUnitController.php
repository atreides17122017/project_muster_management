<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BillUnit;

class BillUnitController extends Controller
{
    // GET ALL
    public function index()
    {
        return response()->json(BillUnit::all());
    }

    // CREATE
    public function store(Request $request)
    {
        $billUnit = BillUnit::create([
    'bill_unit_code' => $request->bill_unit_code,
    'department' => $request->department,
    'station' => $request->station
]);

        return response()->json([
            'message' => 'Bill Unit Added Successfully',
            'bill_unit' => $billUnit
        ]);
    }

    // GET SINGLE
    public function show($id)
    {
        return response()->json(
            BillUnit::findOrFail($id)
        );
    }

    // UPDATE
    public function update(Request $request, $id)
    {
        $billUnit = BillUnit::findOrFail($id);

        $billUnit->update([
    'bill_unit_code' => $request->bill_unit_code,
    'department' => $request->department,
    'station' => $request->station
]);

        return response()->json([
            'message' => 'Bill Unit Updated Successfully',
            'bill_unit' => $billUnit
        ]);
    }

    // DELETE
    public function destroy($id)
    {
        BillUnit::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Bill Unit Deleted Successfully'
        ]);
    }
}