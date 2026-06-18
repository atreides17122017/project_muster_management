<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeeNdaDetail extends Model
{
    protected $fillable = [

        'pf_number',

        'employee_name',

        'designation',

        'from_date',

        'to_date',

        'working_hours',

        'remarks'
    ];
}