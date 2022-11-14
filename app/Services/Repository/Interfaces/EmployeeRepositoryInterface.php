<?php

namespace App\Services\Repository\Interfaces;

use Illuminate\Support\Collection;

interface EmployeeRepositoryInterface
{
    public function getData(): Object;
    
    public function getAllEmployees(): Collection;

    public function addEmployee($data); 
    
}