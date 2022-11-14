<?php

namespace App\Services\Repository\Eloquent;

use DataTables;
use App\Models\User; 
use Illuminate\Http\Response;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;
use App\Services\Repository\BaseRepository;
use App\Services\Repository\Interfaces\EmployeeRepositoryInterface;


class EmployeeRepository extends BaseRepository implements EmployeeRepositoryInterface
{
   
   /**
    * EmployeeRepository constructor.
    *
    * @param User $model
    */
   public function __construct(User $model)
   {
        parent::__construct($model);
   }  

   public function getAllEmployees(): Collection
   {
        return $this->model->with('reports')->get();
   }

   public function getData(): Object
   {
        $data = $this->model->where('type',0)->get();
        return $this->getDataUsingDataTable($data);
   } 

   public function addEmployee($data)
   {     
        $newEmployee = $this->model->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        if($newEmployee) return true;      
        else abort(Response::HTTP_INTERNAL_SERVER_ERROR);
   }
 
}