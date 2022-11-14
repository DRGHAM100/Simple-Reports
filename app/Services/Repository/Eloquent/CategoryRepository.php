<?php

namespace App\Services\Repository\Eloquent;

use DataTables;
use App\Models\Category; 
use App\Models\SubCategory; 
use Illuminate\Http\Response;
use Illuminate\Support\Collection;
use App\Services\Repository\BaseRepository;
use App\Services\Repository\Interfaces\CategoryRepositoryInterface;


class CategoryRepository extends BaseRepository implements CategoryRepositoryInterface
{
    
   /**
    * CategoryRepository constructor.
    *
    * @param Category $model
    */
   public function __construct(Category $model)
   {
       parent::__construct($model);
   }  

   public function getAllCategories(): Collection
   {
        return $this->model->with('sub_categories')->get();
   }

   public function addCategory($data)
   {
        $newCategory = Category::create(['name' => $data['main_category'] ]);

        for($i=0;$i<count($data['sub_category']);$i++){
            SubCategory::create([
                'category_id' => $newCategory->id,
                'name' => $data['sub_category'][$i],
            ]);
        }

        if($newCategory) return true;      
        else abort(Response::HTTP_INTERNAL_SERVER_ERROR);
   }
  
}