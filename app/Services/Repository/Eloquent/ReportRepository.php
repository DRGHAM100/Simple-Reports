<?php

namespace App\Services\Repository\Eloquent;

use DataTables;
use App\Models\Note; 
use App\Models\Report; 
use App\Models\SubCatReport; 
use Illuminate\Http\Response;
use Illuminate\Support\Collection;
use App\Services\Repository\BaseRepository;
use App\Services\Repository\Interfaces\ReportRepositoryInterface;
use App\Helper\UploadFile; 

class ReportRepository extends BaseRepository implements ReportRepositoryInterface
{
   use UploadFile;

   /**
    * ReportRepository constructor.
    *
    * @param Report $model
    */
   public function __construct(Report $model)
   {
       parent::__construct($model);
   }  

   public function addReport($data)
   {
        
        if($data['description_file'] != null)
            $descriptionFile = $this->uploadFile($data['description_file'],storage_path('app/public/report-description-files'));
        
        $newReport = $this->model->create([
            'report_date'   => $data['report_date'],
            'client_id'     => $data['client_id'],
            'client_email'  => $data['client_email'],
            'client_mobile' => $data['client_mobile'],
            'description'   => $data['description'],
            'description_file' => $descriptionFile ?? null,
        ]);

        SubCatReport::create(['sub_category_id' => $data['sub_category_id'],'report_id' => $newReport->id]);
        
        if($newReport) return true;      
        else abort(Response::HTTP_INTERNAL_SERVER_ERROR);
   }

   public function getData($type): Object
   {
        switch($type) {
            case('opened'):
                $data = $this->model->where('type','opened')->get();
                break;
            case('closed'):
                $data = $this->model->where('type','closed')->get();
                break;
            case('closed-confirmed'):
                $data = $this->model->where('type','closed_with_confirm')->get();
                break;
            default:
                $data = $this->model->get();
        }

        return Datatables::of($data)
        ->addColumn('action', function($row){
            $actionBtn = '<a href="javascript:void(0)" class="edit btn btn-success btn-sm">Edit</a> <a href="javascript:void(0)" class="delete btn btn-danger btn-sm">Delete</a>';
            return $actionBtn;
        })
        ->editColumn('created_at', function($row){
            return \Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$row->created_at)->format('Y-m-d');
        })
        ->editColumn('type', function($row){
            if($row->type == 'opened') return 'مفتوح';
            if($row->type == 'closed') return 'مغلق';
            if($row->type == 'closed_with_confirm') return 'مغلق وتم الإفادة';
        })
        ->rawColumns(['action'])
        ->make(true);  
   } 
   
   public function updateReport($data,$id)
   {
        if($data['file'] != null)
            $descriptionFile = $this->uploadFile($data['file'],storage_path('app/public/report-updated-files'));
        
        $updateRecord = $this->model->where('id',$id)->update(['type' => $data['type']]);

        Note::create([
            'report_id' => $id,
            'type'      => $data['type'],
            'description' => $data['notes'],
            'file' => $descriptionFile ?? null
        ]);

        if($updateRecord) return true;      
        else abort(Response::HTTP_INTERNAL_SERVER_ERROR);
   }
    
}