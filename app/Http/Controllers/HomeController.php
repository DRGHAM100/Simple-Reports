<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $totalReportsCount  = Report::count(); 
        $openedReportsCount = Report::where('type','opened')->count(); 
        $closedReportsCount = Report::where('type','closed')->count();
        $closedConfirmedReportsCount = Report::where('type','closed_with_confirm')->count();
        return view('home',compact('totalReportsCount','openedReportsCount','closedReportsCount','closedConfirmedReportsCount'));
    }
}
