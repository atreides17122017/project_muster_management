<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
   protected $fillable = [

    'pf_number',

    'employee_name',

    'mobile_number',

    'employee_station',

    'employee_department',

    'employee_designation',

    'employee_bill_unit',

    'employee_manual_serial_number',

    'upload_file'
];
}