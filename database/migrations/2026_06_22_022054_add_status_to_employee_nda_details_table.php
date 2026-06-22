<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table(
            'employee_nda_details',
            function (Blueprint $table) {

                $table->string('status')
                      ->default('Draft')
                      ->after('remarks');

            }
        );
    }

    public function down(): void
    {
        Schema::table(
            'employee_nda_details',
            function (Blueprint $table) {

                $table->dropColumn('status');

            }
        );
    }
};