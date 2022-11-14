<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Model\User;

class Report extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     */
    protected $fillable = [
        'user_id','report_date','type','client_id','client_email',
        'client_mobile','description','description_file'
    ];

    /**
     * Get the User that adds the report. 
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function($model)
        { 
            $model->user_id = auth()->user()->id;
            
            $data =[
                'client_id'     => $this->client_id,
                'client_email'  => $this->client_email,
                'client_mobile' => $this->client_mobile,
                'description'   => $this->description,
            ];   
            
            event(new \App\Events\NewReport($data));
        });
    }
}
