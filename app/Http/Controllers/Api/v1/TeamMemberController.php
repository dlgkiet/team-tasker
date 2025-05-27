<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Team;
use App\Models\TeamMember;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TeamMemberController extends Controller
{
    // Lấy danh sách thành viên trong team
    public function index($teamId)
    {
        try {
            $team = Team::with('members.user')->findOrFail($teamId);

            if (!$team->members->contains('user_id', Auth::id())) {
                return $this->sendError('Unauthorized', [], 403);
            }

            return $this->sendResponse($team->members, 'Team members fetched successfully');
        } catch (\Exception $e) {
            return $this->sendError('Failed to fetch team members', [$e->getMessage()], 500);
        }
    }

    // Thêm thành viên vào team (chỉ owner)
    public function store(Request $request, $teamId)
    {
        try {
            $request->validate([
                'user_id' => 'required|exists:users,id',
                'role' => 'required|string',
            ]);

            $team = Team::findOrFail($teamId);

            $isOwner = $team->members()
                ->where('user_id', Auth::id())
                ->where('role', 'owner')
                ->exists();

            if (!$isOwner) {
                return $this->sendError('Only owner can add members', [], 403);
            }

            $exists = TeamMember::where('team_id', $teamId)
                ->where('user_id', $request->user_id)
                ->exists();

            if ($exists) {
                return $this->sendError('User is already a member of this team', [], 422);
            }

            $member = TeamMember::create([
                'team_id' => $teamId,
                'user_id' => $request->user_id,
                'role' => $request->role,
            ]);

            return $this->sendResponse($member, 'Member added successfully');
        } catch (\Exception $e) {
            return $this->sendError('Failed to add member', [$e->getMessage()], 500);
        }
    }

    // Cập nhật vai trò thành viên (chỉ owner)
    public function update(Request $request, $teamId, $memberId)
    {
        try {
            $request->validate([
                'role' => 'required|string',
            ]);

            $team = Team::findOrFail($teamId);

            $isOwner = $team->members()
                ->where('user_id', Auth::id())
                ->where('role', 'owner')
                ->exists();

            if (!$isOwner) {
                return $this->sendError('Only owner can update member roles', [], 403);
            }

            $member = TeamMember::where('team_id', $teamId)
                ->where('id', $memberId)
                ->firstOrFail();

            $member->role = $request->role;
            $member->save();

            return $this->sendResponse($member, 'Member role updated successfully');
        } catch (\Exception $e) {
            return $this->sendError('Failed to update member role', [$e->getMessage()], 500);
        }
    }

    // Xoá thành viên (chỉ owner, không được xoá chính mình nếu là owner duy nhất)
    public function destroy($teamId, $memberId)
    {
        try {
            $team = Team::findOrFail($teamId);

            $owner = $team->members()
                ->where('user_id', Auth::id())
                ->where('role', 'owner')
                ->first();

            if (!$owner) {
                return $this->sendError('Only owner can remove members', [], 403);
            }

            $member = TeamMember::where('team_id', $teamId)
                ->where('id', $memberId)
                ->firstOrFail();

            if ($member->user_id === $owner->user_id) {
                return $this->sendError('Owner cannot remove themselves', [], 422);
            }

            $member->delete();

            return $this->sendResponse([], 'Member removed successfully');
        } catch (\Exception $e) {
            return $this->sendError('Failed to remove member', [$e->getMessage()], 500);
        }
    }
}
