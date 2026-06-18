<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    // LOGIN
    public function login(Request $request)
    {
        $credentials = $request->only('username', 'password');

        if (!$token = auth()->attempt($credentials)) {

            return response()->json([
                'message' => 'Invalid username or password'
            ], 401);
        }

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => auth()->user()
        ]);
    }

    // ADD USER
    public function addUser(Request $request)
    {
        $request->validate([

            'username' => 'required|unique:users',
            'password' => 'required',
            'role' => 'required',
            'bill_unit' => 'required',
            'department' => 'required',
            'zone' => 'required',
            'division' => 'required',
        ]);

        $user = User::create([

            'username' => $request->username,

            'password' => bcrypt($request->password),

            'role' => $request->role,

            'bill_unit' => $request->bill_unit,

            'department' => $request->department,

            'zone' => $request->zone,

            'division' => $request->division,
        ]);

        return response()->json([
            'message' => 'User Added Successfully',
            'user' => $user
        ]);
    }

    // CURRENT USER
    public function me()
    {
        return response()->json(auth()->user());
    }

    // LOGOUT
    public function logout()
    {
        auth()->logout();

        return response()->json([
            'message' => 'Logout successful'
        ]);
    }
    //get all users
    public function getUsers()
{
    $users = User::all();

    return response()->json($users);
}
//update user
public function updateUser(Request $request, $id)
{
    $user = User::find($id);

    if (!$user) {

        return response()->json([
            'message' => 'User not found'
        ], 404);
    }

    $user->username = $request->username;
    $user->role = $request->role;
    $user->bill_unit = $request->bill_unit;
    $user->department = $request->department;
    $user->zone = $request->zone;
    $user->division = $request->division;

    // Update password only if given
    if ($request->password) {

        $user->password = bcrypt($request->password);
    }

    $user->save();

    return response()->json([
        'message' => 'User Updated Successfully',
        'user' => $user
    ]);
}
//delete user
public function deleteUser($id)
{
    $user = User::find($id);

    if (!$user) {

        return response()->json([
            'message' => 'User not found'
        ], 404);
    }

    $user->delete();

    return response()->json([
        'message' => 'User Deleted Successfully'
    ]);
}
// Get all supervisors}
}