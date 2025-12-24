<?php

namespace App\Services;

use App\Models\Post;
use Illuminate\Support\Str;

class PostService
{
    /**
     * Get all posts.
     */
    public function getAll(bool $all = false)
    {
        $query = Post::with('category');

        if ($all) {
            return $query->latest()->get();
        }

        return $query->where('is_published', true)
            ->latest('published_at')
            ->get();
    }

    /**
     * Get post by ID or slug.
     */
    public function getByIdOrSlug($id)
    {
        $query = Post::with('category');

        if (is_numeric($id)) {
            return $query->findOrFail($id);
        }

        return $query->where('is_published', true)
            ->where('slug', $id)
            ->firstOrFail();
    }

    /**
     * Create a new post.
     */
    public function create(array $data)
    {
        if (isset($data['is_published']) && $data['is_published'] && !isset($data['published_at'])) {
            $data['published_at'] = now();
        }

        return Post::create($data);
    }

    /**
     * Update an existing post.
     */
    public function update(Post $post, array $data)
    {
        if (isset($data['is_published']) && $data['is_published'] && !$post->published_at) {
            $data['published_at'] = now();
        }

        $post->update($data);
        return $post;
    }

    /**
     * Delete a post.
     */
    public function delete(Post $post)
    {
        return $post->delete();
    }
}
