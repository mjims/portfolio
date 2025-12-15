<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use \Illuminate\Database\Eloquent\Factories\HasFactory;

    protected $fillable = ['title', 'slug', 'excerpt', 'content', 'image', 'is_published', 'published_at', 'category_id'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
