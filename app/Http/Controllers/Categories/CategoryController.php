<?php

namespace App\Http\Controllers\Categories;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\Repository\Interfaces\CategoryRepositoryInterface;

class CategoryController extends Controller
{

    private $categoryRepository;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(CategoryRepositoryInterface $categoryRepository)
    {
        $this->middleware(['auth']);
        $this->categoryRepository = $categoryRepository;
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = $this->categoryRepository->getAllCategories();
        return view('categories.index',compact('categories'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('categories.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
        $data = $request->only(['main_category','sub_category']);
        return $this->categoryRepository->addCategory($data);
    }

}
