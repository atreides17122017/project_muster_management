<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;

class EmployeeController extends Controller
{
    // Get All Employees
    public function index()
    {
        return response()->json(Employee::all());
    }
    public function getByBillUnit($billUnit)
{
$employees = Employee::where(
'employee_bill_unit',
$billUnit
)->get();

return response()->json($employees);

}

    // Add Employee
    public function store(Request $request)
    {
        $employee = Employee::create($request->all());

        return response()->json([
            'message' => 'Employee Added Successfully',
            'employee' => $employee
        ]);
    }

    // Get Single Employee
    public function show($id)
    {
        return response()->json(
            Employee::findOrFail($id)
        );
    }

    // Update Employee
    public function update(Request $request, $id)
    {
        $employee = Employee::findOrFail($id);

        $employee->update($request->all());

        return response()->json([
            'message' => 'Employee Updated Successfully',
            'employee' => $employee
        ]);
    }

    // Delete Employee
    public function destroy($id)
    {
        Employee::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Employee Deleted Successfully'
        ]);
    }
}