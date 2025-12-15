<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    /**
    /**
     * @OA\Get(
     *      path="/api/skills",
     *      operationId="getSkillsList",
     *      tags={"Skills"},
     *      summary="Get list of skills",
     *      description="Returns list of skills",
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *       )
     * )
     */
    public function index()
    {
        return \App\Models\Skill::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string',
            'icon' => 'nullable|string',
        ]);

        return \App\Models\Skill::create($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return \App\Models\Skill::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $skill = \App\Models\Skill::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string',
            'icon' => 'nullable|string',
        ]);

        $skill->update($validated);
        return $skill;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        \App\Models\Skill::destroy($id);
        return response()->noContent();
    }
}
