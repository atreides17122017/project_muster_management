<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Supervisor extends Model
{
    protected $fillable = [
    'supervisor_name',
    'username',
    'password',
    'mobile_number',
    'department',
    'depot',
    'station',
    'bill_unit',
    'role'
];
    //
}
