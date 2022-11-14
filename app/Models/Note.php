<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Report;
use App\Models\User;

class Note extends Model
{
    use HasFactory; 

    /**
     * The attributes that are mass assignable.
     *
     */
    protected $fillable = ['user_id','report_id','type','description','file'];

    /**
     * Get the User that adds the note.
     */
    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    /**
     * Get the Report of the note.
     */
    public function report()
    {
        return $this->belongsTo(Report::class,'report_id');
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function($model)
        { 
            $model->user_id = auth()->user()->id;             
        });
    }
}
