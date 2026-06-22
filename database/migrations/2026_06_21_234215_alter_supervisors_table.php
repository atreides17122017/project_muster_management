<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('supervisors', function (Blueprint $table) {

            $table->renameColumn('name', 'supervisor_name');

            $table->renameColumn('mobile', 'mobile_number');

            $table->string('bill_unit_code')->after('station');

            $table->integer('secret_count')
                  ->default(0)
                  ->after('role');

        });
    }

    public function down(): void
    {
        Schema::table('supervisors', function (Blueprint $table) {

            $table->renameColumn('supervisor_name', 'name');

            $table->renameColumn('mobile_number', 'mobile');

            $table->dropColumn([
                'bill_unit_code',
                'secret_count'
            ]);

        });
    }
};