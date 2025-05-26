<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectMember extends Model
{
    protected $fillable = ['project_id', 'user_id', 'role'];

    public function user()
    {
        return $this->beLongsTo(User::class);
    }

    public function project()
    {
        return $this->beLongsTo(Project::class);
    }
}
