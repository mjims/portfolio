<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $skills = [
            ['name' => 'PHP', 'type' => 'language', 'icon' => 'php'],
            ['name' => 'JavaScript', 'type' => 'language', 'icon' => 'javascript'],
            ['name' => 'Laravel', 'type' => 'framework', 'icon' => 'laravel'],
            ['name' => 'Next.js', 'type' => 'framework', 'icon' => 'nextjs'],
            ['name' => 'React', 'type' => 'framework', 'icon' => 'react'],
            ['name' => 'Git', 'type' => 'tool', 'icon' => 'git'],
            ['name' => 'Docker', 'type' => 'tool', 'icon' => 'docker'],
        ];

        foreach ($skills as $skill) {
            \App\Models\Skill::create($skill);
        }
    }
}
