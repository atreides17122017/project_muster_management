<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Department;

class DepartmentController extends Controller
{
    // Get All Departments
    public function index()
    {
        return response()->json(Department::all());
    }

    // Add Department
    public function store(Request $request)
    {
        $department = Department::create($request->all());

        return response()->json([
            'message' => 'Department Added Successfully',
            'department' => $department
        ]);
    }

    // Get Single Department
    public function show($id)
    {
        return response()->json(
            Department::findOrFail($id)
        );
    }

    // Edit Department
    public function update(Request $request, $id)
    {
        $department = Department::findOrFail($id);

        $department->update($request->all());

        return response()->json([
            'message' => 'Department Updated Successfully',
            'department' => $department
        ]);
    }
}