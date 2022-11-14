<?php

namespace App\Services\Repository\Interfaces;


interface ReportRepositoryInterface
{
    public function getData($type): Object;

    public function addReport($data); 

    public function updateReport($data,$id); 
}