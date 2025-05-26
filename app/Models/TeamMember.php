<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = ['team_id', 'user_id', 'role'];

    public function user()
    {
        return $this->beLongsTo(User::class);
    }

    public function team()
    {
        return $this->beLongsTo(Team::class);
    }
}
