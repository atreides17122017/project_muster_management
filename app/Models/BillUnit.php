<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BillUnit extends Model
{
    protected $fillable = [
        'bill_unit_code',
        'department',
        'station',
        'supervisor_id'
    ];
}
