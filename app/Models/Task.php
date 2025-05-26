<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = ['project_id', 'title', 'status', 'due_date'];

    // Nhiều Task có nhiều Tag
    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'task_tags');
    }

    // Nhiều Task được giao cho nhiều User
    public function users()
    {
        return $this->belongsToMany(User::class, 'task_users');
    }

    // Một task thuộc về một project
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
