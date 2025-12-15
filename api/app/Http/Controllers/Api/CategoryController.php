<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
    /**
     * @OA\Get(
     *      path="/api/categories",
     *      operationId="getCategoriesList",
     *      tags={"Categories"},
     *      summary="Get list of categories",
     *      description="Returns list of categories",
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *       )
     * )
     */
    public function index()
    {
        return \App\Models\Category::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
