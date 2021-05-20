<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Producto;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Producto::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string',
            'talla' => 'required|string',
            'observaciones' => 'required|string',
            'marca_id' => 'required|exists:marca,id',
            'cantidad' => 'required|integer',
            'fecha_embarque' => 'required|date'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $producto = new Producto();
        $producto->nombre = $request->nombre;
        $producto->talla = $request->talla;
        $producto->observaciones = $request->observaciones;
        $producto->marca_id = $request->marca_id;
        $producto->cantidad = $request->cantidad;
        $producto->fecha_embarque = $request->fecha_embarque;

        $producto->save();

        return response()->json(["status"=>true, "message"=> "Se registró correctamente"]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return response()->json(Producto::find($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string',
            'talla' => 'required|string',
            'observaciones' => 'required|string',
            'marca_id' => 'required|exists:marca,id',
            'cantidad' => 'required|integer',
            'fecha_embarque' => 'required|date'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $producto = Producto::find($id);
        $producto->nombre = $request->nombre;
        $producto->talla = $request->talla;
        $producto->observaciones = $request->observaciones;
        $producto->marca_id = $request->marca_id;
        $producto->cantidad = $request->cantidad;
        $producto->fecha_embarque = $request->fecha_embarque;

        $producto->save();

        return response()->json(["status"=>true, "message"=> "Se actualizó correctamente"]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Producto::destroy($id);
        return response()->json(["status"=>true, "message"=> "Se eliminó correctamente"]);
    }
}
