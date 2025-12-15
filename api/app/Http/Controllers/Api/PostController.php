<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
    /**
     * @OA\Get(
     *      path="/api/posts",
     *      operationId="getPostsList",
     *      tags={"Posts"},
     *      summary="Get list of blog posts",
     *      description="Returns list of published blog posts",
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *       )
     * )
     */
    public function index()
    {
        return \App\Models\Post::with('category')
            ->where('is_published', true)
            ->latest('published_at')
            ->get();
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
        return \App\Models\Post::with('category')
            ->where('is_published', true)
            ->where(function ($query) use ($id) {
                $query->where('id', $id)->orWhere('slug', $id);
            })
            ->firstOrFail();
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
