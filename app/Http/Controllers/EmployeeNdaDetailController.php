<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EmployeeNdaDetail;

class EmployeeNdaDetailController extends Controller
{
    // GET ALL
    public function index()
    {
        return response()->json(
            EmployeeNdaDetail::all()
        );
    }

    // ADD
    public function store(Request $request)
    {
        $nda = EmployeeNdaDetail::create([

            'pf_number' => $request->pf_number,

            'employee_name' => $request->employee_name,

            'designation' => $request->designation,

            'from_date' => $request->from_date,

            'to_date' => $request->to_date,

            'working_hours' => $request->working_hours,

            'remarks' => $request->remarks
        ]);

        return response()->json([
            'message' => 'NDA Detail Added Successfully',
            'data' => $nda
        ]);
    }

    // GET SINGLE
    public function show($id)
    {
        return response()->json(
            EmployeeNdaDetail::findOrFail($id)
        );
    }

    // GET BY PF NUMBER (For Eye Icon)
    public function getByPfNumber($pf_number)
    {
        return response()->json(
            EmployeeNdaDetail::where('pf_number', $pf_number)->get()
        );
    }

    // UPDATE
    public function update(Request $request, $id)
    {
        $nda = EmployeeNdaDetail::findOrFail($id);

        $nda->update([

            'pf_number' => $request->pf_number,

            'employee_name' => $request->employee_name,

            'designation' => $request->designation,

            'from_date' => $request->from_date,

            'to_date' => $request->to_date,

            'working_hours' => $request->working_hours,

            'remarks' => $request->remarks
        ]);

        return response()->json([
            'message' => 'NDA Detail Updated Successfully',
            'data' => $nda
        ]);
    }

    // DELETE
    public function destroy($id)
    {
        EmployeeNdaDetail::findOrFail($id)->delete();

        return response()->json([
            'message' => 'NDA Detail Deleted Successfully'
        ]);
    }
}