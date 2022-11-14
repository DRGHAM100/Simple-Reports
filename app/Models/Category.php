<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\SubCategory;

class Category extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     */
    protected $fillable = ['name'];


    /**
     * Get the sub categories for the main category.
     */
    public function subCategories()
    {
        return $this->hasMany(SubCategory::class);
    }
}
