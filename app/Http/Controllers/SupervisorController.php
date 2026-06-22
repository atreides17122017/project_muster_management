<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Supervisor;

class SupervisorController extends Controller
{
    // GET ALL SUPERVISORS
    public function index()
    {
        return response()->json(
            Supervisor::all()
        );
    }

    // ADD SUPERVISOR
    public function store(Request $request)
    {
        $supervisor = Supervisor::create([

            'username' => $request->username,

            'password' =>($request->password),

            'mobile_number' => $request->mobile_number,

            'department' => $request->department,

            'depot' => $request->depot,

            'station' => $request->station,

            'bill_unit_code' => $request->bill_unit_code,

            'role' => $request->role,

            'secret_count' => $request->secret_count

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

        $supervisor->username = $request->username;

        $supervisor->mobile_number = $request->mobile_number;

        $supervisor->department = $request->department;

        $supervisor->depot = $request->depot;

        $supervisor->station = $request->station;

        $supervisor->bill_unit_code = $request->bill_unit_code;

        $supervisor->role = $request->role;

        $supervisor->secret_count = $request->secret_count;
        $supervisor->password = $request->password;

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
    public function login(Request $request)
{
    $supervisor = Supervisor::where(
        'username',
        $request->username
    )->where(
        'password',
        $request->password
    )->first();

    if (!$supervisor) {

        return response()->json([
            'message' => 'Invalid Username or Password'
        ], 401);

    }

    return response()->json([
        'message' => 'Login Successful',
        'user' => $supervisor
    ]);
}
}