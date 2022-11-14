<?php

namespace App\Services\Exports;

use Illuminate\Http\Response;
use  App\Services\Exports\ExportPDF;
use  App\Services\Exports\ExportWord;

class ExportFactory
{

    public static function getInstacne(string $instance)
    {
        $exporterInstance = config('export.exporters')[$instance] ?? null;
        
        if(!$exporterInstance)
            abort(Response::HTTP_INTERNAL_SERVER_ERROR);
        return new $exporterInstance;
    }

}