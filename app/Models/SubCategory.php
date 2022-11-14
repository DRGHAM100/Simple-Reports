<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Modles\Category;

class SubCategory extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     */
    protected $fillable = ['category_id','name'];

    /**
     * Get the Category that owns the sub category.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
