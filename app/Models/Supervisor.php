<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Supervisor extends Model
{
    protected $fillable = [

        'username',

        'password',

        'mobile_number',

        'department',

        'depot',

        'station',

        'bill_unit_code',

        'role',

        'secret_count'

    ];
}