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
    Schema::create('bill_units', function (Blueprint $table) {
    $table->id();

    $table->string('bill_unit_code')->unique(); // 3703351
    $table->string('department'); // OPERATING, COMMERCIAL
    $table->string('designation')->nullable();

    $table->text('stations')->nullable(); // MTM,CLU,PAV...

    $table->unsignedBigInteger('supervisor_id')->nullable();

    $table->timestamps();

    $table->foreign('supervisor_id')
          ->references('id')
          ->on('users')
          ->nullOnDelete();
});
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bill_units');
    }
};
