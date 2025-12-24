<?php

namespace App\Services;

use App\Models\Project;

class ProjectService
{
    /**
     * Get all projects.
     */
    public function getAll()
    {
        return Project::latest()->get();
    }

    /**
     * Get project by ID or slug.
     */
    public function getByIdOrSlug($id)
    {
        return Project::where('id', $id)
            ->orWhere('slug', $id)
            ->firstOrFail();
    }

    /**
     * Create a new project.
     */
    public function create(array $data)
    {
        return Project::create($data);
    }

    /**
     * Update an existing project.
     */
    public function update(Project $project, array $data)
    {
        $project->update($data);
        return $project;
    }

    /**
     * Delete a project.
     */
    public function delete(Project $project)
    {
        return $project->delete();
    }
}
