<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Department;

class DepartmentController extends Controller
{
    // GET ALL
    public function index()
    {
        return response()->json(
            Department::all()
        );
    }

    // CREATE
    public function store(Request $request)
    {
        $request->validate([
            'department_name' => 'required'
        ]);

        $department = Department::create([
            'department_name' => $request->department_name
        ]);

        return response()->json([
            'message' => 'Department Added Successfully',
            'department' => $department
        ]);
    }

    // GET SINGLE
    public function show($id)
    {
        return response()->json(
            Department::findOrFail($id)
        );
    }

    // UPDATE
    public function update(Request $request, $id)
    {
        $request->validate([
            'department_name' => 'required'
        ]);

        $department = Department::findOrFail($id);

        $department->update([
            'department_name' => $request->department_name
        ]);

        return response()->json([
            'message' => 'Department Updated Successfully',
            'department' => $department
        ]);
    }

    // DELETE
    public function destroy($id)
    {
        Department::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Department Deleted Successfully'
        ]);
    }
}