<?php

namespace App\Http\Controllers\Reports;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\Repository\Interfaces\ReportRepositoryInterface;
use App\Services\Repository\Interfaces\CategoryRepositoryInterface;

class ReportController extends Controller
{

    private $reportRepository;
    private $categoryRepository;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(ReportRepositoryInterface $reportRepository,CategoryRepositoryInterface $categoryRepository)
    {
        $this->middleware(['auth']);
        $this->reportRepository   = $reportRepository;
        $this->categoryRepository = $categoryRepository;
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('reports.index');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function secondIndex($status)
    {
        switch($status) {
            case('opened'):
                return view('reports.opened_index');
                break;
            case('closed'):
                return view('reports.closed_index');
                break;
            case('confirmed'):
                return view('reports.closed_confirmed_index');
                break;
            default:
                return redirect()->back();
        }
    }

    /**
     * Get all reports using datatable
     *
     * @return \Illuminate\Http\Response
     */
    public function getData($type)
    {
        return $this->reportRepository->getData($type);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $categories = $this->categoryRepository->getAllCategories();
        return view('reports.create',compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
        if (!$request->file('description_file')) $request->request->set('description_file', null);
        $data = $request->only(['report_date','client_id','client_email','client_mobile','sub_category_id','description','description_file']);
        return $this->reportRepository->addReport($data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {   
        if (!$request->file('file')) $request->request->set('file', null);
        $data = $request->only(['type','notes','file']);
        return $this->reportRepository->updateReport($data,$id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return $this->reportRepository->destroy($id);
    }
}
