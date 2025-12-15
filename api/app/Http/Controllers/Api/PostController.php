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
    public function index(Request $request)
    {
        // If query param 'all' is present (admin), return all
        if ($request->has('all')) {
            return \App\Models\Post::with('category')->latest()->get();
        }

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
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:posts,slug',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'category_id' => 'nullable|exists:categories,id',
            'image' => 'nullable|image|max:2048',
            'is_published' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('posts', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        if (isset($validated['is_published']) && $validated['is_published'] && !isset($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        return \App\Models\Post::create($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Allow admin to see unpublished posts via separate route? Or just use this.
        // For public API, we might want to filter is_published.
        // For Backoffice, we want to see everything.
        // BUT this endpoint is used by public frontend too.
        // For simplicity, let's allow finding by ID for editing (which uses ID), and keep slug for public which filters published.

        $query = \App\Models\Post::with('category');

        if (is_numeric($id)) {
            return $query->findOrFail($id);
        }

        return $query->where('is_published', true)
            ->where('slug', $id)
            ->firstOrFail();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $post = \App\Models\Post::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:posts,slug,' . $id,
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'category_id' => 'nullable|exists:categories,id',
            'image' => 'nullable|image|max:2048',
            'is_published' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($post->image) {
                $oldPath = str_replace('/storage/', '', $post->image);
                \Illuminate\Support\Facades\Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image')->store('posts', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        if (isset($validated['is_published']) && $validated['is_published'] && !$post->published_at) {
            $validated['published_at'] = now();
        }

        $post->update($validated);
        return $post;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $post = \App\Models\Post::findOrFail($id);
        if ($post->image) {
            $oldPath = str_replace('/storage/', '', $post->image);
            \Illuminate\Support\Facades\Storage::disk('public')->delete($oldPath);
        }
        $post->delete();
        return response()->noContent();
    }
}
