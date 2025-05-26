<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\v1\AuthController;

// Auth routes (không cần middleware)
Route::prefix('v1')->group(function () {
    Route::post('/register', [AuthController::class, 'createUser']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    
    // Protected routes
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        
        // User routes
        Route::get('/user', function (Request $request) {
            return $request->user();
        });
        
        // Team routes sẽ thêm sau
        // Route::apiResource('teams', TeamController::class);
        
        // Project routes sẽ thêm sau  
        // Route::apiResource('projects', ProjectController::class);
        
        // Task routes sẽ thêm sau
        // Route::apiResource('tasks', TaskController::class);
    });
});