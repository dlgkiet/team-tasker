<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\v1\AuthController;
use App\Http\Controllers\Api\v1\TeamController;
use App\Http\Controllers\Api\v1\TeamMemberController;
use App\Http\Controllers\Api\v1\ProjectController;
use App\Http\Controllers\Api\v1\ProjectMemberController;
use App\Http\Controllers\Api\v1\TaskController;
use App\Http\Controllers\Api\v1\TaskUserController;
use App\Http\Controllers\Api\v1\TaskTagController;
use App\Http\Controllers\Api\v1\TagController;
use App\Http\Controllers\Api\v1\UserController;

Route::prefix('v1')->group(function () {
    // Auth routes
    Route::post('/register', [AuthController::class, 'createUser']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/refresh', [AuthController::class, 'refresh']);

    // Protected routes
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);

        // User info
        Route::get('/user', [UserController::class, 'show']);
        Route::put('/user', [UserController::class, 'update']);

        // Team routes
        Route::get('/teams', [TeamController::class, 'index']);
        Route::post('/teams', [TeamController::class, 'store']);
        Route::get('/teams/{team}', [TeamController::class, 'show']);
        Route::put('/teams/{team}', [TeamController::class, 'update']);
        Route::delete('/teams/{team}', [TeamController::class, 'destroy']);

        // Team member routes
        Route::get('/teams/{team}/members', [TeamMemberController::class, 'index']);
        Route::post('/teams/{team}/members', [TeamMemberController::class, 'store']);
        Route::put('/teams/{team}/members/{member}', [TeamMemberController::class, 'update']);
        Route::delete('/teams/{team}/members/{member}', [TeamMemberController::class, 'destroy']);

        // Project routes
        Route::get('/projects', [ProjectController::class, 'index']);
        Route::post('/projects', [ProjectController::class, 'store']);
        Route::get('/projects/{project}', [ProjectController::class, 'show']);
        Route::put('/projects/{project}', [ProjectController::class, 'update']);
        Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);

        // Project member routes
        Route::get('/projects/{project}/members', [ProjectMemberController::class, 'index']);
        Route::post('/projects/{project}/members', [ProjectMemberController::class, 'store']);
        Route::put('/projects/{project}/members/{member}', [ProjectMemberController::class, 'update']);
        Route::delete('/projects/{project}/members/{member}', [ProjectMemberController::class, 'destroy']);

        // Task routes
        Route::get('/projects/{project}/tasks', [TaskController::class, 'index']);
        Route::post('/projects/{project}/tasks', [TaskController::class, 'store']);
        Route::get('/tasks/{task}', [TaskController::class, 'show']);
        Route::put('/tasks/{task}', [TaskController::class, 'update']);
        Route::delete('/tasks/{task}', [TaskController::class, 'destroy']);

        // Task user routes
        Route::get('/tasks/{task}/users', [TaskUserController::class, 'index']);
        Route::post('/tasks/{task}/users', [TaskUserController::class, 'store']);
        Route::delete('/tasks/{task}/users/{user}', [TaskUserController::class, 'destroy']);

        // Task tag routes
        Route::get('/tasks/{task}/tags', [TaskTagController::class, 'index']);
        Route::post('/tasks/{task}/tags', [TaskTagController::class, 'store']);
        Route::delete('/tasks/{task}/tags/{tag}', [TaskTagController::class, 'destroy']);

        // Tag routes
        Route::get('/tags', [TagController::class, 'index']);
        Route::post('/tags', [TagController::class, 'store']);
        Route::get('/tags/{tag}', [TagController::class, 'show']);
        Route::put('/tags/{tag}', [TagController::class, 'update']);
        Route::delete('/tags/{tag}', [TagController::class, 'destroy']);
    });
});
