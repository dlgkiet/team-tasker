<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TaskTag extends Model
{
    protected $fillable = ['task_id', 'tag_id'];

    public function task()
    {
        return $this->beLongsTo(Task::class);
    }

    public function tag()
    {
        return $this->beLongsTo(Tag::class);
    }
}
