<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Lấy thông tin người dùng hiện tại
     */
    public function show()
    {
        try {
            $user = Auth::user();
            return $this->sendResponse($user, 'User info retrieved successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Failed to retrieve user info.', [$e->getMessage()], 500);
        }
    }

    /**
     * Cập nhật thông tin người dùng hiện tại
     */
    public function update(Request $request)
    {
        try {
            /** @var User $user */
            $user = Auth::user();

            $request->validate([
                'name' => 'sometimes|string|max:255',
                'email' => 'sometimes|email|unique:users,email,' . $user->id,
                'password' => 'sometimes|string|min:6|confirmed'
            ]);

            if ($request->has('name')) {
                $user->name = $request->name;
            }

            if ($request->has('email')) {
                $user->email = $request->email;
            }

            if ($request->has('password')) {
                $user->password = Hash::make($request->password);
            }

            $user->save();

            return $this->sendResponse($user, 'User info updated successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Failed to update user info.', [$e->getMessage()], 500);
        }
    }
}
