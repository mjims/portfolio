<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = [
            [
                'title' => 'E-Commerce Platform',
                'slug' => 'e-commerce-platform',
                'description' => 'A full-featured e-commerce platform with cart, checkout, and payment integration.',
                'image' => 'https://placehold.co/600x400',
                'url' => 'https://example.com',
                'github_url' => 'https://github.com/example/repo',
            ],
            [
                'title' => 'Task Management App',
                'slug' => 'task-management-app',
                'description' => 'A productivity tool to manage tasks and projects efficiently.',
                'image' => 'https://placehold.co/600x400',
                'url' => 'https://example.com',
                'github_url' => 'https://github.com/example/repo',
            ],
        ];

        foreach ($projects as $project) {
            \App\Models\Project::create($project);
        }
    }
}
