<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\Notes\NoteController;
use App\Http\Controllers\Reports\ReportController;
use App\Http\Controllers\Employees\EmployeeController;
use App\Http\Controllers\Categories\CategoryController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/


Auth::routes(["register" => false]);

Route::get('/home', [HomeController::class, 'index'])->name('home');

// Categories
Route::resource('categories', CategoryController::class);

// Notes
Route::resource('notes', NoteController::class);
Route::get('/all-notes',[NoteController::class, 'getData'])->name('notes.data');

// Employees
Route::resource('employees', EmployeeController::class);
Route::get('/all-employees', [EmployeeController::class, 'getData'])->name('employees.data');

// Reports
Route::resource('reports', ReportController::class);
Route::controller(ReportController::class)->group(function(){
    Route::get('/all-reports/{type}','getData')->name('reports.data');
    Route::get('/{status}-reports','secondIndex')->name('reports.types');
});

// Export
Route::get('/export/{type}/{report_id}', [ExportController::class, 'export'])->name('export');








