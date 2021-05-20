<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Producto extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('producto', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 60);
            $table->char('talla'); // S, M, L
            $table->text('observaciones');
            $table->unsignedBigInteger('marca_id');
            $table->integer('cantidad');
            $table->date('fecha_embarque');
            $table->timestamps();
            $table->foreign('marca_id')->references('id')->on('marca')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('producto');
    }
}
