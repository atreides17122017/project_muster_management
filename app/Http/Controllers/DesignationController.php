<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Designation;

class DesignationController extends Controller
{
    // Get All Designations
    public function index()
    {
        return response()->json(Designation::all());
    }

    // Add Designation
    public function store(Request $request)
    {
        $designation = Designation::create($request->all());

        return response()->json([
            'message' => 'Designation Added Successfully',
            'designation' => $designation
        ]);
    }

    // Get Single Designation
    public function show($id)
    {
        return response()->json(
            Designation::findOrFail($id)
        );
    }

    // Edit Designation
    public function update(Request $request, $id)
    {
        $designation = Designation::findOrFail($id);

        $designation->update($request->all());

        return response()->json([
            'message' => 'Designation Updated Successfully',
            'designation' => $designation
        ]);
    }
}