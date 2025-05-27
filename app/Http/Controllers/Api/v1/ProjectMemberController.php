<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectMember;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProjectMemberController extends Controller
{
    public function index(Project $project)
    {
        try {
            $members = $project->members()->with('user')->get();
            return $this->sendResponse($members, 'Project members retrieved successfully');
        } catch (\Exception $e) {
            return $this->sendError('Failed to fetch members', [$e->getMessage()], 500);
        }
    }

    public function store(Request $request, Project $project)
    {
        try {
            $validator = Validator::make($request->all(), [
                'user_id' => 'required|exists:users,id',
                'role' => 'required|string',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation error', $validator->errors(), 422);
            }

            $data = $validator->validated();
            $data['project_id'] = $project->id;

            $member = ProjectMember::create($data);

            return $this->sendResponse($member, 'Project member added successfully');
        } catch (\Exception $e) {
            return $this->sendError('Failed to add member', [$e->getMessage()], 500);
        }
    }

    public function update(Request $request, Project $project, ProjectMember $member)
    {
        try {
            if ($member->project_id !== $project->id) {
                return $this->sendError('Invalid project member', [], 403);
            }

            $validator = Validator::make($request->all(), [
                'role' => 'required|string',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation error', $validator->errors(), 422);
            }

            $member->update($validator->validated());

            return $this->sendResponse($member, 'Project member updated successfully');
        } catch (\Exception $e) {
            return $this->sendError('Failed to update member', [$e->getMessage()], 500);
        }
    }

    public function destroy(Project $project, ProjectMember $member)
    {
        try {
            if ($member->project_id !== $project->id) {
                return $this->sendError('Invalid project member', [], 403);
            }

            $member->delete();

            return $this->sendResponse([], 'Project member removed successfully');
        } catch (\Exception $e) {
            return $this->sendError('Failed to remove member', [$e->getMessage()], 500);
        }
    }
}
