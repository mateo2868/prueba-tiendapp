<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Marca;

class marcaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Marca::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
            'referencia' => 'required|integer',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $marca = new Marca();
        $marca->nombre = $request->nombre;
        $marca->referencia = $request->referencia;

        $marca->save();

        return response()->json(["status"=>true, "message"=> "Se registró correctamente"]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json(Marca::find($id));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return response()->json(Marca::find($id));
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
            'referencia' => 'required|integer',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $marca = Marca::find($id);
        $marca->nombre = $request->nombre;
        $marca->referencia = $request->referencia;

        $marca->save();

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
        Marca::destroy($id);
        return response()->json(["status"=>true, "message"=> "Se eliminó correctamente"]);
    }
}
