<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\StationController;
use App\Http\Controllers\BillUnitController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\DesignationController;
use App\Http\Controllers\InputOptionController;
use App\Http\Controllers\SupervisorController;
use App\Http\Controllers\EmployeeNdaDetailController;
//users
Route::get('/users', [AuthController::class, 'getUsers']);
Route::put('/update-user/{id}', [AuthController::class, 'updateUser']);
Route::delete('/delete-user/{id}', [AuthController::class, 'deleteUser']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/add-user', [AuthController::class, 'addUser']);
//employees
Route::get('/employees', [EmployeeController::class, 'index']);
Route::post('/employees', [EmployeeController::class, 'store']);
Route::get('/employees/{id}', [EmployeeController::class, 'show']);
Route::put('/employees/{id}', [EmployeeController::class, 'update']);
Route::delete('/employees/{id}', [EmployeeController::class, 'destroy']);
//stations
Route::get('/stations', [StationController::class, 'index']);
Route::post('/stations', [StationController::class, 'store']);
Route::get('/stations/{id}', [StationController::class, 'show']);
Route::put('/stations/{id}', [StationController::class, 'update']);
Route::delete('/stations/{id}', [StationController::class, 'destroy']);
// BILL UNITS
Route::get('/bill-units', [BillUnitController::class, 'index']);
Route::post('/bill-units', [BillUnitController::class, 'store']);
Route::get('/bill-units/{id}', [BillUnitController::class, 'show']);
Route::put('/bill-units/{id}', [BillUnitController::class, 'update']);
Route::delete('/bill-units/{id}', [BillUnitController::class, 'destroy']);
//departments
Route::get('/departments', [DepartmentController::class, 'index']);
Route::post('/departments', [DepartmentController::class, 'store']);
Route::get('/departments/{id}', [DepartmentController::class, 'show']);
Route::put('/departments/{id}', [DepartmentController::class, 'update']);
Route::delete('/departments/{id}', [DepartmentController::class, 'destroy']);
//designations
Route::get('/designations', [DesignationController::class, 'index']);
Route::post('/designations', [DesignationController::class, 'store']);
Route::get('/designations/{id}', [DesignationController::class, 'show']);
Route::put('/designations/{id}', [DesignationController::class, 'update']);
Route::delete('/designations/{id}', [DesignationController::class, 'destroy']);
//input options
Route::get('/input-options', [InputOptionController::class, 'index']);
Route::post('/input-options', [InputOptionController::class, 'store']);
Route::get('/input-options/{id}', [InputOptionController::class, 'show']);
Route::put('/input-options/{id}', [InputOptionController::class, 'update']);
Route::delete('/input-options/{id}', [InputOptionController::class, 'destroy']);
//supervisor
// supervisors
Route::get('/supervisors', [SupervisorController::class, 'index']);
Route::post('/supervisors', [SupervisorController::class, 'store']);
Route::get('/supervisors/{id}', [SupervisorController::class, 'show']);
Route::put('/supervisors/{id}', [SupervisorController::class, 'update']);
Route::delete('/supervisors/{id}', [SupervisorController::class, 'destroy']);
//employee nda details
Route::get('/employee-nda-details', [EmployeeNdaDetailController::class, 'index']);
Route::post('/employee-nda-details', [EmployeeNdaDetailController::class, 'store']);
Route::get('/employee-nda-details/{id}', [EmployeeNdaDetailController::class, 'show']);
Route::put('/employee-nda-details/{id}', [EmployeeNdaDetailController::class, 'update']);
Route::delete('/employee-nda-details/{id}', [EmployeeNdaDetailController::class, 'destroy']);
Route::get(
    '/employee-nda-details/employee/{pf_number}',
    [EmployeeNdaDetailController::class, 'getByPfNumber']
);
Route::middleware('auth:api')->group(function () {

    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});