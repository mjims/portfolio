<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $category = \App\Models\Category::first();

        $posts = [
            [
                'title' => 'Getting Started with Laravel 11',
                'slug' => 'getting-started-with-laravel-11',
                'excerpt' => 'Laravel 11 brings a streamlined application structure...',
                'content' => 'Full content about Laravel 11 goes here...',
                'is_published' => true,
                'published_at' => now(),
                'category_id' => $category ? $category->id : null,
                'image' => 'https://placehold.co/600x400',
            ],
            [
                'title' => 'Mastering Next.js App Router',
                'slug' => 'mastering-nextjs-app-router',
                'excerpt' => 'The App Router in Next.js introduces a new paradigm...',
                'content' => 'Deep dive into server components and layouts...',
                'is_published' => true,
                'published_at' => now()->subDays(2),
                'category_id' => $category ? $category->id : null,
                'image' => 'https://placehold.co/600x400',
            ],
        ];

        foreach ($posts as $post) {
            \App\Models\Post::create($post);
        }
    }
}
