<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\Tag;
use Illuminate\Http\Request;

class TaskTagController extends Controller
{
    // Lấy danh sách tag của task
    public function index($taskId)
    {
        try {
            $task = Task::find($taskId);
            if (!$task) {
                return $this->sendError('Task not found.', [], 404);
            }

            $tags = $task->tags()->get();
            return $this->sendResponse($tags, 'Tags retrieved successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Failed to retrieve tags.', [$e->getMessage()], 500);
        }
    }

    // Gán tag cho task
    public function store(Request $request, $taskId)
    {
        try {
            $request->validate([
                'tag_id' => 'required|integer|exists:tags,id',
            ]);

            $task = Task::find($taskId);
            if (!$task) {
                return $this->sendError('Task not found.', [], 404);
            }

            if ($task->tags()->where('tag_id', $request->tag_id)->exists()) {
                return $this->sendError('Tag already assigned to this task.', [], 409);
            }

            $task->tags()->attach($request->tag_id);

            return $this->sendResponse([], 'Tag assigned to task successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Failed to assign tag.', [$e->getMessage()], 500);
        }
    }

    // Bỏ gán tag khỏi task
    public function destroy($taskId, $tagId)
    {
        try {
            $task = Task::find($taskId);
            if (!$task) {
                return $this->sendError('Task not found.', [], 404);
            }

            if (!$task->tags()->where('tag_id', $tagId)->exists()) {
                return $this->sendError('Tag not assigned to this task.', [], 404);
            }

            $task->tags()->detach($tagId);

            return $this->sendResponse([], 'Tag removed from task successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Failed to remove tag.', [$e->getMessage()], 500);
        }
    }
}
