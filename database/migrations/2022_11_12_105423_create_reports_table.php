<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('report_date')->nullable();
            $table->enum('type', ['opened', 'closed', 'closed_with_confirm'])->default('opened');
            $table->string('client_id')->nullable();
            $table->string('client_email')->nullable();
            $table->string('client_mobile')->nullable();
            $table->text('description')->nullable();
            $table->string('description_file')->nullable();
            $table->foreign('user_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reports');
    }
}
