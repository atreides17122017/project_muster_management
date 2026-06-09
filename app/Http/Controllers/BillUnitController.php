<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BillUnit;

class BillUnitController extends Controller
{
    // Get All Bill Units
    public function index()
    {
        return response()->json(BillUnit::all());
    }

    // Add Bill Unit
    public function store(Request $request)
    {
        $billUnit = BillUnit::create($request->all());

        return response()->json([
            'message' => 'Bill Unit Added Successfully',
            'bill_unit' => $billUnit
        ]);
    }

    // Get Single Bill Unit
    public function show($id)
    {
        return response()->json(
            BillUnit::findOrFail($id)
        );
    }

    // Update Supervisor Only
   public function update(Request $request, $id)
{
    $request->validate([
        'supervisor_id' => 'required'
    ]);

    $billUnit = BillUnit::findOrFail($id);

    $billUnit->supervisor_id = $request->supervisor_id;

    $billUnit->save();

    return response()->json([
        'message' => 'Supervisor Updated Successfully',
        'bill_unit' => $billUnit
    ]);
}

    // Delete Bill Unit
    public function destroy($id)
    {
        BillUnit::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Bill Unit Deleted Successfully'
        ]);
    }
}