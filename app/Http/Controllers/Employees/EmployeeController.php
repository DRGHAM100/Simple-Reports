<?php

namespace App\Http\Controllers\Employees;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\Repository\Interfaces\EmployeeRepositoryInterface;

class EmployeeController extends Controller
{

    private $employeeRepository;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(EmployeeRepositoryInterface $employeeRepository)
    {
        $this->middleware(['auth','isAdmin']);
        $this->employeeRepository = $employeeRepository;
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $employees = $this->employeeRepository->getAllEmployees();
        return view('employees.index',compact('employees'));
    }

    /**
     * Get All Employees using datatable
     *
     * @return \Illuminate\Http\Response
     */
    public function getData()
    {
        return $this->employeeRepository->getData();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('employees.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
        $data = $request->only(['name','email','password']);
        return $this->employeeRepository->addEmployee($data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return $this->employeeRepository->destroy($id);
    }
}
