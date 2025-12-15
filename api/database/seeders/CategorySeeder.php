<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Web Development', 'slug' => 'web-development'],
            ['name' => 'Backend', 'slug' => 'backend'],
            ['name' => 'Frontend', 'slug' => 'frontend'],
            ['name' => 'DevOps', 'slug' => 'devops'],
        ];

        foreach ($categories as $category) {
            \App\Models\Category::create($category);
        }
    }
}
