<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Team;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TeamController extends Controller
{
    // Danh sách các team mà user hiện tại là thành viên
    public function index()
    {
        try {
            $teams = Team::whereHas('members', function ($query) {
                $query->where('user_id', Auth::id());
            })->get();

            return $this->sendResponse($teams, 'Teams fetched successfully');
        } catch (\Exception $e) {
            return $this->sendError('Failed to fetch teams', [$e->getMessage()], 500);
        }
    }

    // Tạo team mới
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
            ]);

            $team = Team::create([
                'name' => $request->name,
            ]);

            // Gán người tạo làm owner
            $team->members()->create([
                'user_id' => Auth::id(),
                'role' => 'owner',
            ]);

            return $this->sendResponse($team, 'Team created successfully');
        } catch (\Exception $e) {
            return $this->sendError('Failed to create team', [$e->getMessage()], 500);
        }
    }

    // Hiển thị chi tiết team
    public function show($id)
    {
        try {
            $team = Team::with('members.user')->findOrFail($id);

            if (!$team->members->contains('user_id', Auth::id())) {
                return $this->sendError('Unauthorized', [], 403);
            }

            return $this->sendResponse($team, 'Team fetched successfully');
        } catch (\Exception $e) {
            return $this->sendError('Failed to fetch team', [$e->getMessage()], 500);
        }
    }

    // Cập nhật team (chỉ chủ sở hữu)
    public function update(Request $request, $id)
    {
        try {
            $team = Team::findOrFail($id);

            $owner = $team->members()->where('user_id', Auth::id())->where('role', 'owner')->first();
            if (!$owner) {
                return $this->sendError('Only the team owner can update the team', [], 403);
            }

            $request->validate([
                'name' => 'required|string|max:255',
            ]);

            $team->update(['name' => $request->name]);

            return $this->sendResponse($team, 'Team updated successfully');
        } catch (\Exception $e) {
            return $this->sendError('Failed to update team', [$e->getMessage()], 500);
        }
    }

    // Xoá team (chỉ chủ sở hữu)
    public function destroy($id)
    {
        try {
            $team = Team::findOrFail($id);

            $owner = $team->members()->where('user_id', Auth::id())->where('role', 'owner')->first();
            if (!$owner) {
                return $this->sendError('Only the team owner can delete the team', [], 403);
            }

            $team->delete();

            return $this->sendResponse([], 'Team deleted successfully');
        } catch (\Exception $e) {
            return $this->sendError('Failed to delete team', [$e->getMessage()], 500);
        }
    }
}
