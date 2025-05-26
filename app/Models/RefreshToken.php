<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class RefreshToken extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'token',
        'expires_at',
    ];

    protected static function boot()
    {
        parent::boot();

        static::retrieved(function ($refreshToken) {
            if (Carbon::parse($refreshToken->expires_at)->isPast()) {
                $refreshToken->delete();
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}