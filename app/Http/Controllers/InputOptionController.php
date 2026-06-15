<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\InputOption;

class InputOptionController extends Controller
{
    // GET ALL
    public function index()
    {
        return response()->json(
            InputOption::all()
        );
    }

    // CREATE
    public function store(Request $request)
    {
        $request->validate([
            'option_code' => 'required',
            'option_name' => 'required'
        ]);

        $inputOption = InputOption::create([
            'option_code' => $request->option_code,
            'option_name' => $request->option_name
        ]);

        return response()->json([
            'message' => 'Input Option Added Successfully',
            'input_option' => $inputOption
        ]);
    }

    // GET SINGLE
    public function show($id)
    {
        return response()->json(
            InputOption::findOrFail($id)
        );
    }

    // UPDATE
    public function update(Request $request, $id)
    {
        $request->validate([
            'option_code' => 'required',
            'option_name' => 'required'
        ]);

        $inputOption = InputOption::findOrFail($id);

        $inputOption->update([
            'option_code' => $request->option_code,
            'option_name' => $request->option_name
        ]);

        return response()->json([
            'message' => 'Input Option Updated Successfully',
            'input_option' => $inputOption
        ]);
    }

    // DELETE
    public function destroy($id)
    {
        InputOption::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Input Option Deleted Successfully'
        ]);
    }
}