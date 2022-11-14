<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\SubCategory;
use App\Models\Report;

class SubCatReport extends Model
{
    use HasFactory; 

    /**
     * The attributes that are mass assignable.
     *
     */
    protected $fillable = ['sub_category_id','report_id'];

    /**
     * Get the sub category that follows the report.
     */
    public function subCategory()
    {
        return $this->belongsTo(SubCategory::class,'sub_category_id');
    }

    /**
     * Get the report that follows the sub category.
     */
    public function report()
    {
        return $this->belongsTo(Report::class,'report_id');
    }
}
