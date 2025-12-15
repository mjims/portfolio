<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
    /**
     * @OA\Get(
     *      path="/api/projects",
     *      operationId="getProjectsList",
     *      tags={"Projects"},
     *      summary="Get list of projects",
     *      description="Returns list of projects",
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *       )
     * )
     */
    public function index()
    {
        return \App\Models\Project::latest()->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
    /**
     * @OA\Get(
     *      path="/api/projects/{id}",
     *      operationId="getProjectById",
     *      tags={"Projects"},
     *      summary="Get project information",
     *      description="Returns project data",
     *      @OA\Parameter(
     *          name="id",
     *          description="Project id or slug",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *       ),
     *      @OA\Response(
     *          response=404,
     *          description="Resource Not Found"
     *      )
     * )
     */
    public function show(string $id)
    {
        return \App\Models\Project::where('id', $id)->orWhere('slug', $id)->firstOrFail();
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
