<?php

namespace App\Services\Repository\Interfaces;

use Illuminate\Support\Collection;

interface CategoryRepositoryInterface
{
    public function getAllCategories(): Collection;

    public function addCategory($data); 
}