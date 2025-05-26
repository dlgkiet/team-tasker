<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TaskUser extends Model
{
    protected $fillable = ['task_id', 'user_id'];

    public function user()
    {
        return $this->beLongsTo(User::class);
    }

    public function task()
    {
        return $this->beLongsTo(Task::class);
    }
}
