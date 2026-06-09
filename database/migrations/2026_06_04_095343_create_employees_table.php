<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
  public function up(): void
{
    Schema::create('employees', function (Blueprint $table) {

        $table->id();

        $table->string('pf_number')->unique();

        $table->string('employee_name');

        $table->string('mobile_number');

        $table->string('employee_station');

        $table->string('employee_department');

        $table->string('employee_designation');

        $table->string('employee_bill_unit');

        $table->string('employee_manual_serial_number');

        $table->string('upload_file')->nullable();

        $table->timestamps();
    });
}
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
