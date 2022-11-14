<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\Repository\Eloquent\NoteRepository;
use App\Services\Repository\Eloquent\ReportRepository;
use App\Services\Repository\Eloquent\EmployeeRepository;
use App\Services\Repository\Eloquent\CategoryRepository;
use App\Services\Repository\Interfaces\NoteRepositoryInterface;
use App\Services\Repository\Interfaces\ReportRepositoryInterface;
use App\Services\Repository\Interfaces\EmployeeRepositoryInterface;
use App\Services\Repository\Interfaces\CategoryRepositoryInterface;


class ReportServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(NoteRepositoryInterface::class, NoteRepository::class);
        $this->app->bind(ReportRepositoryInterface::class, ReportRepository::class);
        $this->app->bind(CategoryRepositoryInterface::class, CategoryRepository::class);
        $this->app->bind(EmployeeRepositoryInterface::class, EmployeeRepository::class);
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
