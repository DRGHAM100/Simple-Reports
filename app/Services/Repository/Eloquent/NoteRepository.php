<?php

namespace App\Services\Repository\Eloquent;

use DataTables;
use App\Models\Note; 
use App\Services\Repository\BaseRepository;
use App\Services\Repository\Interfaces\NoteRepositoryInterface;


class NoteRepository extends BaseRepository implements NoteRepositoryInterface
{
   
   /**
    * NoteRepository constructor.
    *
    * @param Note $model
    */
   public function __construct(Note $model)
   {
       parent::__construct($model);
   }  

   public function getData(): Object
   {
        return Datatables::of($this->model->get())
        ->addColumn('action', function($row){
            $actionBtn = '<a href="javascript:void(0)" class="edit btn btn-success btn-sm">Edit</a> <a href="javascript:void(0)" class="delete btn btn-danger btn-sm">Delete</a>';
            return $actionBtn;
        })
        ->editColumn('user_id', function($row){
            return $row->user->name;
        })
        ->editColumn('report_id', function($row){
            return $row->report->client_id;
        })
        ->editColumn('type', function($row){
            if($row->type == 'opened') return 'مفتوح';
            if($row->type == 'closed') return 'مغلق';
            if($row->type == 'closed_with_confirm') return 'مغلق وتم الإفادة';
        })
        ->rawColumns(['action'])
        ->make(true);  
   }  
    
}