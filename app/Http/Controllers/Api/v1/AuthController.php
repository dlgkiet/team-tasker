<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\RefreshToken;
use Illuminate\Support\Str;
use Carbon\Carbon;

class AuthController extends Controller
{
    // Register
    public function createUser(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max255',
                'email' => 'required|string|email|unique:users,email',
                'password' => [
                    'required',
                    'string',
                    'min:8',
                    'regex:/[A-Z]/',
                    'regex:/[a-z]/',
                    'regex:/[0-9]/',
                ],
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Error', $validator->errors(), 422);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            return $this->sendResponse($user, 'User registered successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Registration failed', ['error' => $e->getMessage()], 500);
        }
    }

    //Login
    public function login(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|string|email|exists:users,email',
                'password' => 'required',
                'remember_me' => 'boolean',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Error', $validator->errors(), 422);
            }

            $credentials = [
                'email' => $request->input('email'),
                'password' => $request->input('password'),
            ];

            if (!Auth::attempt($credentials)) {
                return $this->sendError(__('Email or password is not correct'), [], 401);
            }

            /** @var \App\Models\User $user */
            $user = Auth::user();
            $user->avatar = $user->avatar ? url($user->avatar) : null;

            $token = $user->createToken('auth_token')->plainTextToken;
            $accessTokenExpiryMinutes = env('ACCESS_TOKEN_EXPIRY_MINUTES', 60 * 24);
            $accessTokenCookie = cookie('token', $token, $accessTokenExpiryMinutes);

            $response = $this->sendResponse(
                $user->makeHidden(['created_at'])->toArray(),
                __('Login successfully')
            )->withCookie($accessTokenCookie);

            if ($request->input('remember_me')) {
                $refreshTokenExpiryDays = env('REFRESH_TOKEN_EXPIRY_DAYS', 30);
                $refreshToken = RefreshToken::create([
                    'user_id' => $user->id,
                    'token' => Str::random(60),
                    'expires_at' => now()->addDays($refreshTokenExpiryDays),
                ]);

                $refreshTokenCookie = cookie('refresh_token', $refreshToken->token, $refreshTokenExpiryDays * 24 * 60, null, null, false, true); // HttpOnly

                $response->withCookie($refreshTokenCookie);
            }

            return $response;
        } catch (\Exception $e) {
            return $this->sendError('Login failed', ['error' => $e->getMessage()], 500);
        }
    }

    //Refresh access token using refresh token
    public function refresh(Request $request)
    {
        try {
            $refreshToken = $request->cookie('refresh_token');
            if (!$refreshToken) {
                return $this->sendError('No refresh token available', [], 401);
            }

            $refreshToken = RefreshToken::where('token', $refreshToken)->first();

            if (!$refreshToken || Carbon::parse($refreshToken->expires_at)->isPast()) {
                return $this->sendError('Invalid or expired refresh token', [], 401);
            }

            $user = $refreshToken->user;
            $token = $user->createToken('auth_token')->plainTextToken;
            $accessTokenExpiryMinutes = env('ACCESS_TOKEN_EXPIRY_MINUTES', 60 * 24);
            $accessTokenCookie = cookie('token', $token, $accessTokenExpiryMinutes);

            return $this->sendResponse([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'expires_at' => Carbon::now()->addMinutes(180)->toDateTimeString(),
            ], __('Token refreshed successfully'))->withCookie($accessTokenCookie);
        } catch (\Exception $e) {
            return $this->sendError(__('There is an error occurred, please try again'), [$e->getMessage()], 500);
        }
    }

    //Logout
    public function logout(Request $request)
    {
        try {
            $request->user()->tokens()->delete();
            $request->user()->currentAccessToken()->delete();

            $refreshToken = $request->cookie('refresh_token');
            if ($refreshToken) {
                RefreshToken::where('token', $refreshToken)->delete();
            }

            $response = $this->sendResponse([], __('Logout successfully'));
            $response->withCookie(cookie()->forget('token'))
                ->withCookie(cookie()->forget('refresh_token'));

            return $response;
        } catch (\Exception $e) {
            return $this->sendError('Logout failed', ['error' => $e->getMessage()], 500);
        }
    }
}
