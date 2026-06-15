<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Designation;

class DesignationController extends Controller
{
    // GET ALL
    public function index()
    {
        return response()->json(
            Designation::all()
        );
    }

    // CREATE
    public function store(Request $request)
    {
        $request->validate([
            'designation_name' => 'required'
        ]);

        $designation = Designation::create([
            'designation_name' => $request->designation_name
        ]);

        return response()->json([
            'message' => 'Designation Added Successfully',
            'designation' => $designation
        ]);
    }

    // GET SINGLE
    public function show($id)
    {
        return response()->json(
            Designation::findOrFail($id)
        );
    }

    // UPDATE
    public function update(Request $request, $id)
    {
        $request->validate([
            'designation_name' => 'required'
        ]);

        $designation = Designation::findOrFail($id);

        $designation->update([
            'designation_name' => $request->designation_name
        ]);

        return response()->json([
            'message' => 'Designation Updated Successfully',
            'designation' => $designation
        ]);
    }

    // DELETE
    public function destroy($id)
    {
        Designation::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Designation Deleted Successfully'
        ]);
    }
}