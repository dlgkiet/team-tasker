<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Authenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Kiểm tra token từ header Authorization
        if ($request->bearerToken()) {
            $request->headers->set('Authorization', 'Bearer ' . $request->bearerToken());
        }
        // Hoặc từ cookie
        elseif ($request->cookie('token')) {
            $request->headers->set('Authorization', 'Bearer ' . $request->cookie('token'));
        }

        if (!Auth::guard('sanctum')->check()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        return $next($request);
    }

    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo(Request $request)
    {
        if (!$request->expectsJson()) {
            return route('login');
        }
    }
}