<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Services\ProjectService;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    protected $projectService;

    public function __construct(ProjectService $projectService)
    {
        $this->projectService = $projectService;
    }

    /**
     * Get list of projects.
     */
    public function index()
    {
        return $this->projectService->getAll();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:projects,slug',
            'description' => 'required|string',
            'languages' => 'nullable|string',
            'image' => 'nullable|string', // Absolute URL
            'url' => 'nullable|url',
            'github_url' => 'nullable|url',
        ]);

        return $this->projectService->create($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return $this->projectService->getByIdOrSlug($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $project = Project::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:projects,slug,' . $id,
            'description' => 'required|string',
            'languages' => 'nullable|string',
            'image' => 'nullable|string', // Absolute URL
            'url' => 'nullable|url',
            'github_url' => 'nullable|url',
        ]);

        return $this->projectService->update($project, $validated);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $project = Project::findOrFail($id);
        $this->projectService->delete($project);
        return response()->noContent();
    }
}

