<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bill_units', function (Blueprint $table) {

            $table->dropColumn('designation');
            $table->dropColumn('supervisor_id');

        });
    }

    public function down(): void
    {
        Schema::table('bill_units', function (Blueprint $table) {

            $table->string('designation')->nullable();

            $table->unsignedBigInteger('supervisor_id')->nullable();

        });
    }
};