<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Supervisor;

class SupervisorController extends Controller
{
    // GET ALL SUPERVISORS
    public function index()
    {
        return response()->json(Supervisor::all());
    }

    // ADD SUPERVISOR
    public function store(Request $request)
    {
        $supervisor = Supervisor::create([

            'supervisor_name' => $request->supervisor_name,

            'username' => $request->username,

            'password' => bcrypt($request->password),

            'mobile_number' => $request->mobile_number,

            'department' => $request->department,

            'depot' => $request->depot,

            'station' => $request->station,

            'bill_unit' => $request->bill_unit,

            'role' => $request->role,
        ]);

        return response()->json([
            'message' => 'Supervisor Added Successfully',
            'supervisor' => $supervisor
        ]);
    }

    // GET SINGLE SUPERVISOR
    public function show($id)
    {
        return response()->json(
            Supervisor::findOrFail($id)
        );
    }

    // UPDATE SUPERVISOR
    public function update(Request $request, $id)
    {
        $supervisor = Supervisor::findOrFail($id);

        $supervisor->supervisor_name = $request->supervisor_name;
        $supervisor->username = $request->username;
        $supervisor->mobile_number = $request->mobile_number;
        $supervisor->department = $request->department;
        $supervisor->depot = $request->depot;
        $supervisor->station = $request->station;
        $supervisor->bill_unit = $request->bill_unit;
        $supervisor->role = $request->role;

        if ($request->password) {
            $supervisor->password = bcrypt($request->password);
        }

        $supervisor->save();

        return response()->json([
            'message' => 'Supervisor Updated Successfully',
            'supervisor' => $supervisor
        ]);
    }

    // DELETE SUPERVISOR
    public function destroy($id)
    {
        Supervisor::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Supervisor Deleted Successfully'
        ]);
    }
}