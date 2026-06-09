<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\InputOption;

class InputOptionController extends Controller
{
    // Get All
    public function index()
    {
        return response()->json(InputOption::all());
    }

    // Add
    public function store(Request $request)
    {
        $inputOption = InputOption::create($request->all());

        return response()->json([
            'message' => 'Input Option Added Successfully',
            'input_option' => $inputOption
        ]);
    }

    // Get Single
    public function show($id)
    {
        return response()->json(
            InputOption::findOrFail($id)
        );
    }

    // Update
    public function update(Request $request, $id)
    {
        $inputOption = InputOption::findOrFail($id);

        $inputOption->update($request->all());

        return response()->json([
            'message' => 'Input Option Updated Successfully',
            'input_option' => $inputOption
        ]);
    }
}