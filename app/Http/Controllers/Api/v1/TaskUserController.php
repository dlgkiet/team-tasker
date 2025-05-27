<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskUserController extends Controller
{
    public function index($taskId)
    {
        try {
            $task = Task::find($taskId);
            if (!$task) {
                return $this->sendError('Task not found.', [], 404);
            }

            $users = $task->users()->get();

            return $this->sendResponse($users, 'Users assigned to task retrieved successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Failed to retrieve users.', [$e->getMessage()], 500);
        }
    }

    public function store(Request $request, $taskId)
    {
        try {
            $request->validate([
                'user_id' => 'required|integer|exists:users,id',
            ]);

            $task = Task::find($taskId);
            if (!$task) {
                return $this->sendError('Task not found.', [], 404);
            }

            if ($task->users()->where('user_id', $request->user_id)->exists()) {
                return $this->sendError('User already assigned to this task.', [], 409);
            }

            $task->users()->attach($request->user_id);

            return $this->sendResponse([], 'User assigned to task successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Failed to assign user.', [$e->getMessage()], 500);
        }
    }

    public function destroy($taskId, $userId)
    {
        try {
            $task = Task::find($taskId);
            if (!$task) {
                return $this->sendError('Task not found.', [], 404);
            }

            if (!$task->users()->where('user_id', $userId)->exists()) {
                return $this->sendError('User not assigned to this task.', [], 404);
            }

            $task->users()->detach($userId);

            return $this->sendResponse([], 'User removed from task successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Failed to remove user.', [$e->getMessage()], 500);
        }
    }
}
