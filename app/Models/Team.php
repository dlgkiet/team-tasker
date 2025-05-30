<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = ['name'];

    public function members()
    {
        return $this->hasMany(TeamMember::class);
    }

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}
