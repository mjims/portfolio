<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Skill extends Model
{
    /** @use HasFactory<\Database\Factories\SkillFactory> */
    use HasFactory;

    protected $fillable = ['name', 'icon', 'type'];
}
