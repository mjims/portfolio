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
            ['name' => 'HTML', 'type' => 'language', 'icon' => 'html5'],
            ['name' => 'CSS', 'type' => 'language', 'icon' => 'css3'],
            ['name' => 'JavaScript', 'type' => 'language', 'icon' => 'javascript'],
            ['name' => 'PHP', 'type' => 'language', 'icon' => 'php'],
            ['name' => 'Python', 'type' => 'language', 'icon' => 'python'],
            ['name' => 'C/C++', 'type' => 'language', 'icon' => 'cplusplus'],

            ['name' => 'Bootstrap', 'type' => 'framework', 'icon' => 'bootstrap'],
            ['name' => 'Jquery', 'type' => 'framework', 'icon' => 'jquery'],
            ['name' => 'React-native', 'type' => 'framework', 'icon' => 'react'],
            ['name' => 'Laravel', 'type' => 'framework', 'icon' => 'laravel'],
            ['name' => 'Next.js', 'type' => 'framework', 'icon' => 'nextjs'],

            ['name' => 'Wordpress', 'type' => 'cms', 'icon' => 'wordpress'],
            ['name' => 'Prestashop', 'type' => 'cms', 'icon' => 'prestashop'],

            ['name' => 'MySQL', 'type' => 'database', 'icon' => 'mysql'],
            ['name' => 'Firebase', 'type' => 'database', 'icon' => 'firebase'],
            ['name' => 'MongoDB', 'type' => 'database', 'icon' => 'mongodb'],

            ['name' => 'Git', 'type' => 'tool', 'icon' => 'git'],
            ['name' => 'Docker', 'type' => 'tool', 'icon' => 'docker'],
            ['name' => 'Postman', 'type' => 'tool', 'icon' => 'postman'],
        ];

        foreach ($skills as $skill) {
            \App\Models\Skill::updateOrCreate(
                ['name' => $skill['name']],
                $skill
            );
        }
    }
}
