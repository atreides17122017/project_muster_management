<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InputOption extends Model
{
    protected $fillable = [
        'option_code',
        'option_name'
    ];
}