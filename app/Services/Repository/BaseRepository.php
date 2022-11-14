<?php   

namespace App\Services\Repository;   

use DataTables;
use Illuminate\Http\Response;
use Illuminate\Database\Eloquent\Model;   

class BaseRepository 
{     
    /**      
     * @var Model      
     */     
     protected $model;       

    /**      
     * BaseRepository constructor.      
     *      
     * @param Model $model      
     */     
    public function __construct(Model $model)     
    {         
        $this->model = $model;
    }

    protected function getDataUsingDataTable($data): Object
    {
        return Datatables::of($data)
        ->addColumn('action', function($row){
            $actionBtn = '<a href="javascript:void(0)" class="edit btn btn-success btn-sm">Edit</a> <a href="javascript:void(0)" class="delete btn btn-danger btn-sm">Delete</a>';
            return $actionBtn;
        })
        ->rawColumns(['action'])
        ->make(true); 
    }

    public function destroy($id)
    {
        $destroy = $this->model->where('id',$id)->delete();
        
        if($destroy) return true;      
        else abort(Response::HTTP_INTERNAL_SERVER_ERROR);
    }
 
}