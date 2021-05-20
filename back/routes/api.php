<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MarcaController;
use App\Http\Controllers\ProductoController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/




Route::group(['prefix' => 'marca'], function () use ($router) {
    Route::get('', [MarcaController::class, 'index']);
    Route::get('edit/{id}', [MarcaController::class, 'edit']);
    Route::put('update/{id}', [MarcaController::class, 'update']);
    Route::delete('destroy/{id}', [MarcaController::class, 'destroy']);
    Route::post('store', [MarcaController::class, 'store']);
});

Route::group(['prefix' => 'producto'], function () use ($router) {
    Route::get('', [ProductoController::class, 'index']);
    Route::get('edit/{id}', [ProductoController::class, 'edit']);
    Route::put('update/{id}', [ProductoController::class, 'update']);
    Route::delete('destroy/{id}', [ProductoController::class, 'destroy']);
    Route::post('store', [ProductoController::class, 'store']);
});
// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
