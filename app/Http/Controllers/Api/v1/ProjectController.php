<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    public function index()
    {
        try {
            $projects = Project::with('team')->get();
            return $this->sendResponse($projects, 'Project list retrieved successfully');
        } catch (\Exception $e) {
            return $this->sendError('Failed to fetch projects', [$e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'team_id' => 'required|exists:teams,id',
                'description' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation error', $validator->errors(), 422);
            }

            $project = Project::create($validator->validated());

            return $this->sendResponse($project, 'Project created successfully');
        } catch (\Exception $e) {
            return $this->sendError('Failed to create project', [$e->getMessage()], 500);
        }
    }

    public function show(Project $project)
    {
        try {
            $project->load('team', 'members');
            return $this->sendResponse($project, 'Project retrieved successfully');
        } catch (\Exception $e) {
            return $this->sendError('Failed to get project', [$e->getMessage()], 500);
        }
    }

    public function update(Request $request, Project $project)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'sometimes|string|max:255',
                'description' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation error', $validator->errors(), 422);
            }

            $project->update($validator->validated());

            return $this->sendResponse($project, 'Project updated successfully');
        } catch (\Exception $e) {
            return $this->sendError('Failed to update project', [$e->getMessage()], 500);
        }
    }

    public function destroy(Project $project)
    {
        try {
            $project->delete();
            return $this->sendResponse([], 'Project deleted successfully');
        } catch (\Exception $e) {
            return $this->sendError('Failed to delete project', [$e->getMessage()], 500);
        }
    }
}
