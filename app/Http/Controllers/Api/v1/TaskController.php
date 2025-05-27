<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        try {
            $tasks = Task::all();
            return $this->sendResponse($tasks, 'Tasks retrieved successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Failed to retrieve tasks.', [$e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'project_id' => 'required|integer|exists:projects,id',
                'title' => 'required|string|max:255',
                'status' => 'nullable|string|max:50',
                'due_date' => 'nullable|date',
            ]);

            $task = Task::create($validated);
            return $this->sendResponse($task, 'Task created successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Failed to create task.', [$e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            $task = Task::find($id);
            if (!$task) {
                return $this->sendError('Task not found.', [], 404);
            }
            return $this->sendResponse($task, 'Task retrieved successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Failed to retrieve task.', [$e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $task = Task::find($id);
            if (!$task) {
                return $this->sendError('Task not found.', [], 404);
            }

            $validated = $request->validate([
                'project_id' => 'sometimes|integer|exists:projects,id',
                'title' => 'sometimes|string|max:255',
                'status' => 'sometimes|string|max:50',
                'due_date' => 'sometimes|date',
            ]);

            $task->update($validated);
            return $this->sendResponse($task, 'Task updated successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Failed to update task.', [$e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $task = Task::find($id);
            if (!$task) {
                return $this->sendError('Task not found.', [], 404);
            }

            $task->delete();
            return $this->sendResponse([], 'Task deleted successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Failed to delete task.', [$e->getMessage()], 500);
        }
    }
}
