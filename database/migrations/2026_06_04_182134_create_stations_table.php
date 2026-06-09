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

        $table->string('bill_unit_code')->unique();

        $table->string('department');

        $table->text('station');

        $table->unsignedBigInteger('supervisor_id');

        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stations');
    }
};
