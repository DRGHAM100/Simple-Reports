<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubCatReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sub_cat_reports', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sub_category_id');
            $table->unsignedBigInteger('report_id');
            $table->foreign('sub_category_id')->references('id')->on('sub_categories');
            $table->foreign('report_id')->references('id')->on('reports');
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
        Schema::dropIfExists('sub_cat_reports');
    }
}
